"use client";

import Button from "@/app/_components/button";
import { ReactNode, useContext, useState } from "react";
import { CreationParametersContext } from "../_contexts/creation-parameters";
import { useRouter } from "next/navigation";

export interface CreateRoomButtonProperties {
  /** Whether the button should be disabled. */
  disabled?: boolean;
  children: ReactNode;
}

/**
 * A button that creates a room and redirects to it.
 * @param properties - Properties of the button.
 * @returns The button component.
 */
export default function CreateRoomButton(
  properties: CreateRoomButtonProperties,
) {
  const router = useRouter();

  const [creating, setCreating] = useState(false);

  const {
    password,
    nickname: username,
    letters,
    themes,
  } = useContext(CreationParametersContext);

  return (
    <Button
      onClick={() => {
        setCreating(true);

        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/create`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            letters: [...(letters || [])],
            categories: [...(themes || [])],
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            if (!("id" in json) || typeof json.id !== "string")
              throw new TypeError("Invalid JSON response");

            console.log(json);

            router.push(
              `/sala/entrar/?room_id=${encodeURIComponent(json.id)}&nickname=${encodeURIComponent(username)}&room_password=${encodeURIComponent(password)}`,
            );
          });
      }}
      disabled={creating || properties.disabled}
    >
      {properties.children}
    </Button>
  );
}
