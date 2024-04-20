import { onCleanup, onMount } from "solid-js";

export function ReceiveNUI(
  handler: (data: any) => void
) {
  const eventListener = (event: any) => {
    handler(event);
  };
  onMount(() => window.addEventListener("message", eventListener));
  onCleanup(() => window.removeEventListener("message", eventListener));
}
