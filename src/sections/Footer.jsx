import { Container } from "../components/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/6 py-8">
      <Container className="flex flex-col gap-4 text-sm text-slate sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-white">Ganesh Baidar Shrestha / Gwachey Dreamer</p>
          <p className="mt-1">Builder of Ideas. Writer of Feelings.</p>
        </div>
        <div className="text-left sm:text-right">
          <p>(c) 2026 All rights reserved.</p>
          <p className="mt-1">A quiet signature from Kathmandu, Nepal.</p>
        </div>
      </Container>
    </footer>
  );
}
