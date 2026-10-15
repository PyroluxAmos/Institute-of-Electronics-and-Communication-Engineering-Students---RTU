import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-8xl font-extrabold text-navy-900/10">404</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-navy-950">Page not found</h1>
        <p className="mt-2 text-slate-600">The page you&apos;re looking for doesn&apos;t exist or was moved.</p>
        <ButtonLink href="/" className="mt-6">Back to home</ButtonLink>
      </div>
    </Container>
  );
}
