import Button from "@/app/_components/button";
import { CreationParametersContext } from "../_contexts/creation-parameters";
import { useContext } from "react";
import { XIcon } from "lucide-react";

export interface ThemeProperties {
  /** Name of the theme. */
  name: string;
}

/**
 * A theme present in the room, for use in the room creation UI.
 * @param props Theme properties.
 * @param props.name Name of the theme.
 * @returns The theme component.
 */
export default function Theme({ name }: ThemeProperties) {
  const { removeTheme } = useContext(CreationParametersContext);

  return (
    <div className="flex w-fit max-w-full flex-row items-center rounded-full bg-blue-800 outline outline-[3px] outline-blue-700">
      <div className="overflow-hidden overflow-ellipsis px-2 py-1 [line-height:1]">
        {name}
      </div>{" "}
      <Button
        onClick={() => removeTheme(name)}
        aria-label="Remover tema"
        unstyled
      >
        <XIcon className="text-red-400" size={"1.5em"} />
      </Button>
    </div>
  );
}
