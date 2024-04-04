import unimplemented from "@/lib/unimplemented";
import { createContext } from "react";
import { FromPlayerMessage } from "stop-server/src/player-messages";

/** Context type for the websocket connecting the client to the room server. */
export interface WebSocketContext {
  /**
   * Sends a WebSocket message to the room server.
   * @param message - Message to send.
   */
  send(message: FromPlayerMessage): void;
}

/** Context for the websocket connecting the client to the room server. */
export const WebSocketContext = createContext<WebSocketContext>({
  send: unimplemented,
});
