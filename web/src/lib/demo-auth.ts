/** Demo-only: swap header “Sign in” → “Studio” until real auth ships. */
export const DEMO_AUTH_KEY = "ek_studio_demo";

export function readDemoAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(DEMO_AUTH_KEY) === "1";
}

export function setDemoAuthed(on: boolean) {
  if (typeof window === "undefined") return;
  if (on) window.localStorage.setItem(DEMO_AUTH_KEY, "1");
  else window.localStorage.removeItem(DEMO_AUTH_KEY);
}

/** Subscribe to demo auth flag + cross-tab storage (React `useSyncExternalStore`). */
export function subscribeDemoAuthed(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener("ek-demo-auth", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("ek-demo-auth", handler);
  };
}

export function getServerSnapshotDemoAuthed() {
  return false;
}
