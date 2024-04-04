"use client";

import TextInput from "@/app/_components/text-input";
import { useContext, useState } from "react";
import { CreationParametersContext } from "../_contexts/creation-parameters";
import Button from "@/app/_components/button";
import { CurrentScreenContext } from "../_contexts/current-screen";
import { ArrowBigRightIcon } from "lucide-react";
import Section from "@/app/_components/section";
import SilentForm from "@/app/_components/silent-form";

/**
 * Component for choosing the room password when creating a room.
 * @returns The component.
 */
export default function EditPassword() {
  const { setPassword } = useContext(CreationParametersContext);
  const [passwordDraft, setPasswordDraft] = useState("");

  const { nextScreen } = useContext(CurrentScreenContext);

  return (
    <Section title="Senha">
      <SilentForm
        onSubmit={() => {
          setPassword(passwordDraft);
          nextScreen();
        }}
      >
        <div className="card flex max-w-sm flex-col gap-2">
          <TextInput
            type="password"
            value={passwordDraft}
            onChange={setPasswordDraft}
          >
            Qual será a senha da sala?
          </TextInput>
        </div>
        <Button submit disabled={passwordDraft.length === 0}>
          {passwordDraft.length === 0 ? (
            "Senha muito pequena"
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
