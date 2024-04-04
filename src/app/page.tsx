import { LogInIcon, SquarePlusIcon } from "lucide-react";
import Button from "./_components/button";

/**
 * The start page of the website.
 * @returns The start page.
 */
export default function Home() {
  return (
    <>
      <h1 className="glow text-5xl">STOP</h1>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button href="/sala/entrar">
          <LogInIcon /> Entrar em sala
        </Button>
        <Button href="/sala/criar">
          <SquarePlusIcon /> Criar sala
        </Button>
      </div>
    </>
  );
}
