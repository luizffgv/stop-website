"use client";

import TextInput from "@/app/_components/text-input";
import { useContext, useState } from "react";
import { CreationParametersContext } from "../_contexts/creation-parameters";
import Button from "@/app/_components/button";
import Theme from "./theme";
import { CurrentScreenContext } from "../_contexts/current-screen";
import { ArrowBigRightIcon } from "lucide-react";
import Section from "@/app/_components/section";
import SilentForm from "@/app/_components/silent-form";

/**
 * Component for choosing the list of themes when creating a room.
 * @returns The component.
 */
export default function EditThemes() {
  const creationParametersContext = useContext(CreationParametersContext);
  const [themesDraft, setThemesDraft] = useState(
    new Set<string>(creationParametersContext.themes ?? []),
  );
  const [newTheme, setNewTheme] = useState("");

  const { nextScreen } = useContext(CurrentScreenContext);

  return (
    <CreationParametersContext.Provider
      value={{
        ...creationParametersContext,
        themes: themesDraft,
        addTheme: (theme) => setThemesDraft(new Set([...themesDraft, theme])),
        removeTheme: (theme) => {
          themesDraft.delete(theme);
          setThemesDraft(new Set(themesDraft));
        },
      }}
    >
      <Section title="Temas">
        <div className="card flex max-w-sm flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p>
              Defina os temas da sala
              {themesDraft.size === 0 && (
                <>
                  <br />
                  Ex: &quot;Objeto&quot; e &quot;Cor&quot;
                </>
              )}
            </p>
            {themesDraft.size > 0 && (
              <ul className="flex flex-row flex-wrap gap-2">
                {[...themesDraft].map((theme) => (
                  <li key={theme} className="contents">
                    <Theme name={theme} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <SilentForm
            onSubmit={() => {
              setThemesDraft(new Set([...themesDraft, newTheme]));
              setNewTheme("");
            }}
            className="flex flex-col items-center gap-4"
          >
            <TextInput value={newTheme} onChange={setNewTheme}>
              Adicione um tema
            </TextInput>
            <Button
              submit
              disabled={
                newTheme.length === 0 ||
                themesDraft.has(newTheme) ||
                themesDraft.size > 32
              }
            >
              {themesDraft.size < 32
                ? "Adicionar tema"
                : "Limite de temas atingido"}
            </Button>
          </SilentForm>
        </div>
        <Button
          onClick={() => {
            creationParametersContext.setThemes(themesDraft);
            nextScreen();
          }}
          disabled={themesDraft.size === 0}
        >
          {themesDraft.size === 0 ? (
            "Adicione pelo menos um tema"
          ) : (
            <>
              Continuar
              <ArrowBigRightIcon />
            </>
          )}
        </Button>
      </Section>
    </CreationParametersContext.Provider>
  );
}
