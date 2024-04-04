import Button from "@/app/_components/button";
import { JoinCloseCodes } from "../_lib/join-close-codes";
import CloseCodes from "stop-server/src/close-codes";

const errorMessages = {
  [CloseCodes.NICKNAME_ALREADY_IN_ROOM]:
    "Esse nome já está sendo usado por algum jogador na sala.",
  [CloseCodes.NO_ROOM_WITH_ID]: "Não existe nenhuma sala com o ID fornecido.",
  [CloseCodes.WRONG_ROOM_PASSWORD]: "Senha da sala incorreta.",
} as const satisfies { [code in JoinCloseCodes]: string };

export interface JoinErrorProperties {
  /** WebSocket close code sent by the server. */
  code: JoinCloseCodes;
}

/**
 * Renders the description of an error that occurred joining a room.
 * @param properties - Properties of the component.
 * @param properties.code - WebSocket close code sent by the server.
 * @returns The error component.
 */
export default function JoinError({ code }: JoinErrorProperties) {
  return (
    <>
      <div className="card max-w-sm">{errorMessages[code]}</div>
      <Button href="/">Voltar ao início</Button>
    </>
  );
}
