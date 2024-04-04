import { useContext } from "react";
import CreateRoomButton from "./create-room-button";
import Button from "@/app/_components/button";
import { CurrentScreenContext } from "../_contexts/current-screen";
import {
  CaseUpperIcon,
  KeyRoundIcon,
  ListIcon,
  SquarePlusIcon,
  SquareUserRoundIcon,
} from "lucide-react";
import Section from "@/app/_components/section";

/**
 * The room creation parameters confirmation page.
 * @returns The component.
 */
export default function ConfirmRoomCreation() {
  const { setScreen } = useContext(CurrentScreenContext);

  return (
    <Section title="Confirmação">
      <div className="card flex max-w-sm flex-col items-center gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-center">Quer mudar algo?</span>
          <div className="flex flex-row flex-wrap gap-2">
            <Button onClick={() => setScreen("nickname")}>
              <SquareUserRoundIcon /> Seu apelido
            </Button>
            <Button onClick={() => setScreen("password")}>
              <KeyRoundIcon /> Senha da sala
            </Button>
            <Button onClick={() => setScreen("themes")}>
              <ListIcon /> Temas
            </Button>
            <Button onClick={() => setScreen("letters")}>
              <CaseUpperIcon /> Letras
            </Button>
          </div>
        </div>
      </div>
      <CreateRoomButton>
        <SquarePlusIcon /> Criar sala
      </CreateRoomButton>
    </Section>
  );
}
