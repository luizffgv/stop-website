"use client";

import { useContext } from "react";
import { RoomContext, RoomState } from "../_contexts/room";
import Button from "@/app/_components/button";
import TextInput from "@/app/_components/text-input";
import { WebSocketContext } from "../_contexts/websocket";
import { OctagonIcon } from "lucide-react";

/**
 * Component for answering the themes in a round.
 * @returns The answering component.
 */
export default function Answering() {
  const { state, themes } = useContext(RoomContext);
  const { send } = useContext(WebSocketContext);

  if (state.value != RoomState.ANSWERING)
    throw new Error(
      "Tried to render Answering component outside of answering state.",
    );

  return (
    <>
      <span className="glow text-center text-4xl">
        {state.data.letter.toUpperCase()}
      </span>
      <div className="card flex max-w-sm flex-col gap-2">
        <ul className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-2">
          {themes.map((theme) => (
            <li key={theme} className="contents">
              <TextInput
                onChange={(value) => {
                  send({
                    type: "change-answer",
                    content: { category: theme, answer: value.trim() },
                  });
                }}
              >
                {theme}
              </TextInput>
            </li>
          ))}
        </ul>
      </div>
      <Button
        onClick={() => send({ type: "stop-round" })}
        disabled={!state.data.stopAvailable}
      >
        {state.data.stopAvailable ? (
          <>
            Pedir STOP <OctagonIcon />
          </>
        ) : (
          "STOP indisponível"
        )}
      </Button>
    </>
  );
}
