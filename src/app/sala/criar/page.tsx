"use client";

import { useContext } from "react";
import { CreationParametersContext } from "./_contexts/creation-parameters";
import EditNickname from "./_components/edit-nickname";
import EditLetters from "./_components/edit-letters";
import EditThemes from "./_components/edit-themes";
import EditPassword from "./_components/edit-password";
import ConfirmRoomCreation from "./_components/confirm-room-creation";
import { CurrentScreenContext } from "./_contexts/current-screen";

/**
 * Page for choosing the player nickname when creating a room.
 * @returns The page component.
 */
export default function Page() {
  const { screen } = useContext(CurrentScreenContext);

  return (
    <>
      {screen === "nickname" ? (
        <EditNickname />
      ) : screen === "themes" ? (
        <EditThemes />
      ) : screen === "letters" ? (
        <EditLetters />
      ) : screen === "password" ? (
        <EditPassword />
      ) : screen === "confirm" ? (
        <ConfirmRoomCreation />
      ) : (
        <>Unknown screen</>
      )}
    </>
  );
}
