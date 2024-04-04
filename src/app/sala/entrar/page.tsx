"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Room from "./_components/room";
import TextInput from "@/app/_components/text-input";
import Button from "@/app/_components/button";
import SilentForm from "@/app/_components/silent-form";
import { ArrowBigRightIcon } from "lucide-react";

export interface EntryComponentProperties {
  onSubmit: (value: string) => void;
}

/**
 * Component for inputting a room ID.
 * @param properties - Properties of the component.
 * @returns The component.
 */
function EnterRoomID(properties: EntryComponentProperties) {
  const [roomID, setRoomID] = useState("");

  return (
    <>
      <SilentForm onSubmit={() => properties.onSubmit(roomID)}>
        <div className="card flex max-w-sm flex-col items-center gap-2">
          <TextInput value={roomID} onChange={setRoomID}>
            Insira o ID da sala
          </TextInput>
        </div>
        <Button submit disabled={roomID.length === 0}>
          {roomID.length === 0 ? (
            "ID muito curto"
          ) : (
            <>
              Continuar <ArrowBigRightIcon />
            </>
          )}
        </Button>
      </SilentForm>
    </>
  );
}

/**
 * Component for inputting a player nickname.
 * @param properties - Properties of the component.
 * @returns The component.
 */
function EnterNickname(properties: EntryComponentProperties) {
  const [nickname, setNickname] = useState("");

  return (
    <>
      <SilentForm onSubmit={() => properties.onSubmit(nickname)}>
        <div className="card flex max-w-sm flex-col items-center gap-2">
          <TextInput value={nickname} onChange={setNickname}>
            Qual será seu apelido?
          </TextInput>
        </div>
        <Button submit disabled={nickname.length === 0}>
          {nickname.length === 0 ? (
            "Apelido muito curto"
          ) : (
            <>
              Continuar <ArrowBigRightIcon />
            </>
          )}
        </Button>
      </SilentForm>
    </>
  );
}

/**
 * Component for inputting a room password.
 * @param properties - Properties of the component.
 * @returns The component.
 */
function EnterRoomPassword(properties: EntryComponentProperties) {
  const [password, setPassword] = useState("");

  return (
    <>
      <SilentForm onSubmit={() => properties.onSubmit(password)}>
        <div className="card flex max-w-sm flex-col items-center gap-2">
          <TextInput value={password} onChange={setPassword}>
            Insira a senha da sala
          </TextInput>
        </div>
        <Button submit disabled={password.length === 0}>
          {password.length === 0 ? (
            "Senha muito curta"
          ) : (
            <>
              Continuar <ArrowBigRightIcon />
            </>
          )}
        </Button>
      </SilentForm>
    </>
  );
}

/**
 * A page for joining a room, optionally pre-filling room info fields using URL
 * parameters.
 * @returns The component.
 */
export default function Page() {
  const parameters = useSearchParams();

  const [roomID, setRoomID] = useState(parameters.get("room_id"));
  const [nickname, setNickname] = useState(parameters.get("nickname"));
  const [roomPassword, setRoomPassword] = useState(
    parameters.get("room_password"),
  );

  return roomID == undefined ? (
    <EnterRoomID onSubmit={setRoomID} />
  ) : roomPassword == undefined ? (
    <EnterRoomPassword onSubmit={setRoomPassword} />
  ) : nickname == undefined ? (
    <EnterNickname onSubmit={setNickname} />
  ) : (
    <Room roomID={roomID} roomPassword={roomPassword} nickname={nickname} />
  );
}
