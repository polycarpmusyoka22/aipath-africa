import { Mail, ArrowRight } from "lucide-react";

import Button from "../ui/Button";
import Container from "../ui/Container";
import Input from "../ui/Input";

export default function Contact() {
  return (
    <section id="contact" className="bg-[#09090B] py-28">
      <Container>

        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-12">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
              <Mail className="text-green-500" size={40} />
            </div>

            <h2 className="mt-8 text-5xl font-bold">
              Join AIPath Africa
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              Get notified about verified AI jobs, learning resources,
              career opportunities and platform updates.
            </p>

            <div className="mt-10 flex flex-col gap-4 md:flex-row">

              <Input
                type="email"
                placeholder="Enter your email address"
              />

              <Button className="md:px-8">
                Subscribe
                <ArrowRight className="ml-2" size={18} />
              </Button>

            </div>

            <p className="mt-5 text-sm text-zinc-500">
              No spam. Unsubscribe anytime.
            </p>

          </div>

        </div>

      </Container>
    </section>
  );
}