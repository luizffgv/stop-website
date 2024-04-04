import { useContext, useState } from "react";
import { CreationParametersContext } from "../_contexts/creation-parameters";
import TextInput from "@/app/_components/text-input";
import Button from "@/app/_components/button";
import { CurrentScreenContext } from "../_contexts/current-screen";
import { ArrowBigRightIcon } from "lucide-react";
import Section from "@/app/_components/section";
import SilentForm from "@/app/_components/silent-form";

/**
 * Component for choosing the nickname when creating a room.
 * @returns The component.
 */
export default function EditNickname() {
  const { nickname, setNickname } = useContext(CreationParametersContext);
  const [nicknameDraft, setNicknameDraft] = useState(nickname ?? "");

  const { nextScreen } = useContext(CurrentScreenContext);

  return (
    <Section title={"Apelido"}>
      <SilentForm
        onSubmit={() => {
          setNickname(nicknameDraft);
          nextScreen();
        }}
      >
        <div className="card">
          <TextInput value={nicknameDraft} onChange={setNicknameDraft}>
            Qual será seu apelido?
          </TextInput>
        </div>
        <Button submit disabled={nicknameDraft.trim().length === 0}>
          {nicknameDraft.trim().length === 0 ? (
            "Apelido muito pequeno"
          ) : (
            <>
              Continuar
              <ArrowBigRightIcon />
            </>
          )}
        </Button>
      </SilentForm>
    </Section>
  );
}
