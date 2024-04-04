import unimplemented from "@/lib/unimplemented";
import { createContext } from "react";
import { JoinCloseCodes } from "../_lib/join-close-codes";

/** A general state of a game room. */
export enum RoomState {
  /** The state is still unknown. */
  UNKNOWN = "unknown",
  /** The player failed to join the room. */
  JOIN_FAILURE = "join-failure",
  /** Lobby, the round hasn't started yet. */
  LOBBY = "lobby",
  /** The round is starting. */
  STARTING = "starting",
  /** The player is answering the themes. */
  ANSWERING = "answering",
  /** Time for answering ended, waiting for voting to start. */
  BEFORE_VOTING = "before-voting",
  /** Voting for a theme has started. */
  VOTING = "voting",
  /** Voting has ended and scores are available. */
  LEADERBOARD = "leaderboard",
}

/** Data that each {@link RoomState} holds. */
export interface RoomStateData {
  [RoomState.JOIN_FAILURE]: { code: JoinCloseCodes };
  [RoomState.ANSWERING]: { letter: string; stopAvailable: boolean };
  [RoomState.VOTING]: { theme: string; answers: Record<string, boolean> };
  [RoomState.LEADERBOARD]: {
    scores: Record<string, number>;
  };
}

/** A {@link RoomState} that has associated data. */
type RoomStateWithData = keyof RoomStateData;

/** A {@link RoomState} that has no associated data. */
export type RoomStateWithoutData = Exclude<RoomState, RoomStateWithData>;

/** A {@link RoomState} grouped with its associated data . */
export type RoomStateAndData = {
  [S in RoomState]: S extends RoomStateWithData
    ? { value: S; data: RoomStateData[S] }
    : { value: S; data?: undefined };
}[RoomState];

/** Context type for a game room. */
export interface RoomContext {
  /** ID of the room. */
  readonly id: string;

  /** State of the room and its associated data. */
  readonly state: RoomStateAndData;

  /** Themes in the room. */
  readonly themes: Readonly<string[]>;

  /** Players in the room. */
  readonly players: Readonly<string[]>;

  /**
   * Updates the state of the room and its associated data.
   * @param state - The new state.
   */
  setState(state: RoomStateAndData): void;
}

/** Context for a game room. */
export const RoomContext = createContext<RoomContext>({
  id: "",
  state: { value: RoomState.LOBBY },
  themes: [],
  players: [],
  setState: unimplemented,
});
