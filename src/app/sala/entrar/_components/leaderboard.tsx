import { useContext, useEffect, useState } from "react";
import { RoomContext, RoomState } from "../_contexts/room";
import Button from "@/app/_components/button";
import { WebSocketContext } from "../_contexts/websocket";
import { Repeat2Icon } from "lucide-react";

/**
 * The post-round leaderboard.
 * @returns The component.
 */
export default function Leaderboard() {
  const { state } = useContext(RoomContext);
  const { send } = useContext(WebSocketContext);

  // We have a client-side delay before the new round can be started, so users
  // don't accidentally click the button by accident as soon as it appears.
  // We should do this server-side but it's not urgent.
  const [newRoundStartable, setNewRoundStartable] = useState(false);
  useEffect(() => {
    const newRoundStartableTimeout = setTimeout(() => {
      setNewRoundStartable(true);
    }, 3e3);

    return () => clearTimeout(newRoundStartableTimeout);
  });

  if (state.value !== RoomState.LEADERBOARD)
    throw new Error(
      "Tried to render Leaderboard component outside of leaderboard state.",
    );

  return (
    <>
      <section className="card flex flex-col gap-2">
        <h2 className="text-center text-xl">Placar </h2>
        <ol className="flex flex-col items-stretch gap-2">
          {Object.entries(state.data.scores)
            .sort(([, score1], [, score2]) => score2 - score1)
            .map(([name, score]) => (
              <li
                key={name}
                className="flex flex-row items-center justify-between gap-x-4"
              >
                <span className="break-words">{name}</span>
                <span className="whitespace-nowrap">{score} pts</span>
              </li>
            ))}
        </ol>
      </section>
      <Button
        onClick={() => send({ type: "start-round" })}
        disabled={!newRoundStartable}
      >
        <Repeat2Icon /> Jogar novamente
      </Button>
    </>
  );
}
