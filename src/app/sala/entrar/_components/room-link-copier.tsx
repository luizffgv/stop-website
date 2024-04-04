import { ClipboardCheckIcon, ClipboardXIcon } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { RoomContext } from "../_contexts/room";
import Button from "@/app/_components/button";

/**
 * Component for copying the link to the current room as per
 * {@link RoomContext}.
 * @returns The component.
 */
export default function RoomLinkCopier() {
  const { id } = useContext(RoomContext);

  // Whether the "link copied" message or an error is currently shown.
  const [linkCopiedMessage, setLinkCopiedMessage] = useState<
    "shown" | "hidden" | "error"
  >("hidden");
  // Timeout for setting linkCopied to back to false.
  const linkCopiedMessageTimeout = useRef<number>();

  return (
    <Button
      onClick={() => {
        navigator.clipboard
          .writeText(
            `${window.location.protocol}//${window.location.host}/sala/entrar?room_id=${encodeURIComponent(id)}`,
          )
          .then(() => setLinkCopiedMessage("shown"))
          .catch(() => setLinkCopiedMessage("error"))
          .then(() => {
            window.clearTimeout(linkCopiedMessageTimeout.current);
            linkCopiedMessageTimeout.current = window.setTimeout(() => {
              linkCopiedMessageTimeout.current = undefined;
              setLinkCopiedMessage("hidden");
            }, 3e3);
          });
      }}
      disabled={linkCopiedMessage != "hidden"}
    >
      {linkCopiedMessage === "shown" ? (
        <>
          <ClipboardCheckIcon />
          <span>Link copiado</span>
        </>
      ) : linkCopiedMessage === "error" ? (
        <>
          <ClipboardXIcon />
          <span>Erro ao copiar</span>
        </>
      ) : (
        "Copiar link"
      )}
    </Button>
  );
}
