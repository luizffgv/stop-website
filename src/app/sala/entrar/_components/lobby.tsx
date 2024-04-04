"use client";

import { useContext } from "react";
import { RoomContext } from "../_contexts/room";
import Button from "@/app/_components/button";
import { WebSocketContext } from "../_contexts/websocket";
import RoomLinkCopier from "./room-link-copier";
import Section from "@/app/_components/section";
import { UsersIcon } from "lucide-react";

/**
 * The pre-game lobby.
 * @returns The component.
 */
export default function Lobby() {
  const { players } = useContext(RoomContext);
  const { send } = useContext(WebSocketContext);

  return (
    <>
      <Section
        className="card flex max-w-sm flex-col items-center gap-2"
        title={
          <>
            Jogadores <UsersIcon className="inline" />
          </>
        }
      >
        <ul className="flex flex-col items-center gap-2">
          {players.map((player) => (
            <li key={player}>{player}</li>
          ))}
        </ul>
      </Section>
      <RoomLinkCopier />
      <Button onClick={() => send({ type: "start-round" })}>
        Iniciar partida
      </Button>
    </>
  );
}
