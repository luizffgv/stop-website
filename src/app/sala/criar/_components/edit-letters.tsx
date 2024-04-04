"use client";

import { useContext, useState } from "react";
import { CreationParametersContext } from "../_contexts/creation-parameters";
import Button from "@/app/_components/button";
import Letter from "./letter";
import { Letters } from "@/lib/letters";
import { CurrentScreenContext } from "../_contexts/current-screen";
import { ArrowBigRightIcon } from "lucide-react";
import Section from "@/app/_components/section";
import SilentForm from "@/app/_components/silent-form";

/** The default set of letters available in the room. */
const defaultLetters = Letters.filter((l) => !["X", "Y", "Z"].includes(l));

/**
 * Component for choosing the list of letters when creating a room.
 * @returns The component.
 */
export default function EditLetters() {
  const creationParametersContext = useContext(CreationParametersContext);
  const [lettersDraft, setLettersDraft] = useState(
    new Set(creationParametersContext.letters ?? defaultLetters),
  );

  const { nextScreen } = useContext(CurrentScreenContext);

  return (
    <CreationParametersContext.Provider
      value={{
        ...creationParametersContext,
        letters: lettersDraft,
        setLetter: (letter, present) => {
          if (present) setLettersDraft(new Set([...lettersDraft, letter]));
          else {
            lettersDraft.delete(letter);
            setLettersDraft(new Set(lettersDraft));
          }
        },
        setLetters: setLettersDraft,
      }}
    >
      <Section title="Letras">
        <SilentForm
          onSubmit={() => {
            creationParametersContext.setLetters(lettersDraft);
            nextScreen();
          }}
        >
          <div className="card flex max-w-sm flex-col gap-2">
            <p className="text-center">Quais serão as letras disponíveis?</p>
            <p>Uma letra será sorteada a cada rodada</p>
            <ul className="flex flex-row flex-wrap gap-2">
              {Letters.map((letter) => (
                <li key={letter} className="contents">
                  <Letter letter={letter} />
                </li>
              ))}
            </ul>
          </div>
          <Button submit disabled={lettersDraft.size === 0}>
            {lettersDraft.size === 0 ? (
              "Selecione no mínimo uma letra"
            ) : (
              <>
                Continuar <ArrowBigRightIcon />
              </>
            )}
          </Button>
        </SilentForm>
      </Section>
    </CreationParametersContext.Provider>
  );
}
