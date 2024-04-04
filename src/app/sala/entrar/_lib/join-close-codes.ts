import CloseCodes from "stop-server/src/close-codes";

/** Close codes that represent errors joining a room. */
export const JoinCloseCodes = [
  CloseCodes.NICKNAME_ALREADY_IN_ROOM,
  CloseCodes.NO_ROOM_WITH_ID,
  CloseCodes.WRONG_ROOM_PASSWORD,
] as const;

/** Close codes that represent errors joining a room. */
export type JoinCloseCodes = (typeof JoinCloseCodes)[number];
