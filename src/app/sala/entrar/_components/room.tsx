"use client";

import { toPlayerMessageSchema } from "stop-server/src/player-messages";
import { useEffect, useState } from "react";
import { JoinCloseCodes } from "../_lib/join-close-codes";
import { RoomContext, RoomState, RoomStateAndData } from "../_contexts/room";
import { WebSocketContext } from "../_contexts/websocket";
import Answering from "./answering";
import JoinError from "./join-error";
import Leaderboard from "./leaderboard";
import Loading from "./loading";
import Lobby from "./lobby";
import Voting from "./voting";
import useReferenceState from "@/lib/use-reference-state";

/** Properties needed to be in a room. */
export interface RoomProperties {
  /** The nickname of the player for which this component is being rendered. */
  nickname: string;
  /** The ID of the room. */
  roomID: string;
  /** The password of the room. */
  roomPassword: string;
}

/**
 * Shows the current room state and manages the player-server WebSocket
 * connection.
 * @param properties - The room properties.
 * @returns The room.
 */
export default function Room(properties: RoomProperties) {
  // We access the context through refs to avoid having to recreate callbacks
  // every time the context changes. This is important as objects from the
  // context are passed to event handlers for WebSocket messages and having to
  // recreate the handlers every time the state changes would be hell.
  const themes = useReferenceState<string[]>([]);
  const players = useReferenceState<string[]>([]);
  const state = useReferenceState<RoomStateAndData>({
    value: RoomState.UNKNOWN,
  });

  const [ws, setWs] = useState<WebSocket>();
  const [wsState, setWsState] = useState<"connecting" | "open" | "closed">(
    "connecting",
  );

  useEffect(() => {
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_SERVER_WS_URL}/rooms/join?room_id=${encodeURIComponent(properties.roomID)}&nickname=${encodeURIComponent(properties.nickname)}&room_password=${encodeURIComponent(properties.roomPassword)}`,
    );

    setWs(ws);

    let heartbeatInterval: number | undefined;
    ws.addEventListener("open", () => {
      setWsState("open");

      heartbeatInterval = window.setInterval(() => {
        ws.send(JSON.stringify({ type: "heartbeat" }));
      }, 10e3);
    });

    ws.addEventListener("message", (event) => {
      const data = toPlayerMessageSchema.parse(JSON.parse(event.data));

      console.log("Received");
      console.log(data);

      switch (data.type) {
        case "room-categories": {
          themes.set(data.content);
          break;
        }
        case "room-players": {
          // We assume the room state should be LOBBY. This should be replaced
          // later.
          state.set({ value: RoomState.LOBBY });
          players.set(data.content);
          break;
        }
        case "player-joined": {
          players.set([...players.value, data.content.name]);
          break;
        }
        case "player-removed": {
          players.set(
            players.value.filter((name) => name !== data.content.name),
          );
          break;
        }
        case "round-starting": {
          state.set({ value: RoomState.STARTING });
          break;
        }
        case "round-started": {
          state.set({
            value: RoomState.ANSWERING,
            data: { letter: data.content.letter, stopAvailable: false },
          });
          break;
        }
        case "stop-available": {
          if (state.value.value != RoomState.ANSWERING)
            throw new Error(
              "Received a stop available message outside of answering state.",
            );

          state.set({
            value: RoomState.ANSWERING,
            data: { ...state.value.data, stopAvailable: true },
          });
          break;
        }
        case "round-stopping": {
          state.set({ value: RoomState.BEFORE_VOTING });
          break;
        }
        case "category-vote-started": {
          state.set({
            value: RoomState.VOTING,
            data: {
              theme: data.content.category,
              answers: Object.assign(
                {},
                ...data.content.answers.map((answer) => ({
                  [answer]: true,
                })),
              ),
            },
          });
          break;
        }
        case "voting-ended": {
          state.set({
            value: RoomState.LEADERBOARD,
            data: {
              scores: data.content.scores,
            },
          });
          break;
        }
      }
    });

    ws.addEventListener("close", (event) => {
      setWsState("closed");

      if ((JoinCloseCodes as Readonly<unknown[]>).includes(event.code))
        state.set({
          value: RoomState.JOIN_FAILURE,
          data: { code: event.code as JoinCloseCodes },
        });

      clearInterval(heartbeatInterval);
    });

    return () => {
      ws.close();
    };
  }, [
    properties.nickname,
    properties.roomID,
    properties.roomPassword,
    themes,
    players,
    state,
  ]);

  return (
    <RoomContext.Provider
      value={{
        id: properties.roomID,
        state: state.value,
        themes: themes.value,
        players: players.value,
        setState: state.set,
      }}
    >
      {wsState === "connecting" && <Loading>Conectando</Loading>}
      {wsState === "open" && (
        <WebSocketContext.Provider
          value={{
            send: (message) => {
              console.log("Sent");
              console.log(message);

              ws?.send(JSON.stringify(message));
            },
          }}
        >
          {state.value.value === RoomState.LOBBY && <Lobby />}
          {state.value.value === RoomState.STARTING && (
            <Loading>Iniciando rodada</Loading>
          )}
          {state.value.value === RoomState.ANSWERING && <Answering />}
          {state.value.value === RoomState.BEFORE_VOTING && (
            <Loading>Iniciando votação</Loading>
          )}
          {state.value.value === RoomState.VOTING && <Voting />}
          {state.value.value === RoomState.LEADERBOARD && <Leaderboard />}
        </WebSocketContext.Provider>
      )}
      {wsState === "closed" && state.value.value === RoomState.JOIN_FAILURE && (
        <JoinError code={state.value.data.code}></JoinError>
      )}
    </RoomContext.Provider>
  );
}
