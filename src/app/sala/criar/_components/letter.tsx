import { useContext } from "react";
import { CreationParametersContext } from "../_contexts/creation-parameters";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import type { Letter } from "@/lib/letters";

export interface LetterProperties {
  /** The letter to display. */
  letter: Letter;
}

/**
 * A letter in the list of letters for creating a room.
 * @param props - Properties of the component.
 * @param props.letter - The letter to represent.
 * @returns The letter component.
 */
export default function Letter({ letter }: LetterProperties) {
  const { letters, setLetter } = useContext(CreationParametersContext);

  return (
    <label className="relative flex flex-row items-center rounded-full bg-blue-800">
      {letters?.has(letter) ? (
        <CircleCheckIcon className="text-emerald-400" size="1.5em" />
      ) : (
        <CircleXIcon className="text-red-400" size="1.5em" />
      )}
      <div className="px-2 py-1 [line-height:1]">{letter}</div>
      <input
        className="absolute inset-0 cursor-pointer appearance-none rounded-full outline outline-[3px] outline-blue-700"
        type="checkbox"
        onChange={() => setLetter(letter, !letters?.has(letter))}
        checked={letters?.has(letter)}
      ></input>
    </label>
  );
}
