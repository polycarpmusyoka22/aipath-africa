import Container from "../ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#09090B] py-10">
      <Container>

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          <div>

            <h2 className="text-2xl font-bold">
              AIPath Africa
            </h2>

            <p className="mt-2 text-zinc-500">
              Connecting African Talent with Global AI Opportunities.
            </p>

          </div>

          <div className="flex gap-8 text-zinc-400">

            <a href="#about" className="hover:text-green-400">
              About
            </a>

            <a href="#services" className="hover:text-green-400">
              Services
            </a>

            <a href="#jobs" className="hover:text-green-400">
              Jobs
            </a>

            <a href="#contact" className="hover:text-green-400">
              Contact
            </a>

          </div>

        </div>

        <div className="mt-10 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} AIPath Africa. All rights reserved.
        </div>

      </Container>
    </footer>
  );
}