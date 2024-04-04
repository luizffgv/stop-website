"use client";

import { useContext, useEffect } from "react";
import { RoomContext, RoomState } from "../_contexts/room";
import { WebSocketContext } from "../_contexts/websocket";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";

export interface VotableAnswerProperties {
  /** Answer content. */
  answer: string;
}

/**
 * A theme present in the room, for use in the room creation UI.
 * @param props Component properties.
 * @param props.answer Answer content.
 * @returns The votable answer component.
 */
export default function VotableAnswer({ answer }: VotableAnswerProperties) {
  const { state, setState } = useContext(RoomContext);
  const { send } = useContext(WebSocketContext);

  if (state.value !== RoomState.VOTING)
    throw new Error(
      "Tried to render VotableAnswer component outside of voting state.",
    );

  const accepted = state.data.answers[answer];
  useEffect(() => {
    send({
      type: "change-answer-vote",
      content: { answer, accepted },
    });
    // It doesn't make sense for `send` to be changed so it isn't included in
    // the dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accepted, state.data.theme, answer]);

  return (
    <label className="relative flex flex-row items-center rounded-full bg-blue-800 outline outline-[3px] outline-blue-700">
      {state.data.answers[answer] ? (
        <CircleCheckIcon className="text-emerald-400" size="1.5em" />
      ) : (
        <CircleXIcon className="text-red-400" size="1.5em" />
      )}
      <div className="px-2 py-1 [line-height:1]">{answer}</div>
      <input
        className="absolute inset-0 cursor-pointer appearance-none rounded-full focus:ring"
        type="checkbox"
        onChange={() => {
          setState({
            value: RoomState.VOTING,
            data: {
              ...state.data,
              answers: {
                ...state.data.answers,
                [answer]: !state.data.answers[answer],
              },
            },
          });
        }}
        checked={state.data.answers[answer]}
      ></input>
    </label>
  );
}
