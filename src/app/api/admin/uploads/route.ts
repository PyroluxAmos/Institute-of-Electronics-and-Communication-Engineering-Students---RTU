import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ATTACHMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/zip",
  "text/plain",
];

/**
 * Issues a short-lived Vercel Blob client-upload token.
 * The browser uploads directly to Blob, avoiding serverless request-size limits.
 * This route is protected by the same signed HttpOnly officer session as /admin.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!(await isAdmin())) throw new Error("Your officer session expired. Sign in again.");

        let kind: "image" | "attachment";
        try {
          const parsed = JSON.parse(clientPayload || "{}") as { kind?: string };
          if (parsed.kind !== "image" && parsed.kind !== "attachment") throw new Error();
          kind = parsed.kind;
        } catch {
          throw new Error("Invalid upload category.");
        }

        const expectedPrefix = kind === "image" ? "bulletin/images/" : "bulletin/attachments/";
        if (!pathname.startsWith(expectedPrefix) || pathname.includes("..")) {
          throw new Error("Invalid upload path.");
        }

        return {
          allowedContentTypes: kind === "image" ? IMAGE_TYPES : ATTACHMENT_TYPES,
          maximumSizeInBytes: kind === "image" ? 10 * 1024 * 1024 : 25 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ kind }),
        };
      },
      onUploadCompleted: async () => {
        // The returned Blob URL is saved on the post by the authenticated client.
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload authorization failed." },
      { status: 400 },
    );
  }
}
