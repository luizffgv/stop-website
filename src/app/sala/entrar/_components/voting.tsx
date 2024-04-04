"use client";

import { useContext } from "react";
import { RoomContext, RoomState } from "../_contexts/room";
import VotableAnswer from "./votable-answer";
import Section from "@/app/_components/section";

/**
 * The answers voting page.
 * @returns The component.
 */
export default function Voting() {
  const { state } = useContext(RoomContext);

  if (state.value !== RoomState.VOTING)
    throw new Error(
      "Tried to render Voting component outside of voting state.",
    );

  return (
    <>
      <span className="glow text-center text-4xl">{state.data.theme}</span>
      <Section
        className="card flex flex-col gap-2"
        title="Marque as respostas corretas"
      >
        <ul className="flex flex-row flex-wrap justify-center gap-2">
          {Object.keys(state.data.answers).map((answer) => (
            <li key={answer} className="contents">
              <VotableAnswer answer={answer} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
