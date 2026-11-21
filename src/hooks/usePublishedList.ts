import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Loads a published collection once, then refreshes it when the tab is focused.
 * The previous list stays on screen during a refresh, so cards are not cleared
 * and redrawn from a different copy.
 */
export function usePublishedList<T>(loader: () => Promise<T[]>, fallback: T[] = []) {
  const [items, setItems] = useState<T[]>([]);
  const [ready, setReady] = useState(false);
  const loaderRef = useRef(loader);
  const fallbackRef = useRef(fallback);
  const requestId = useRef(0);

  loaderRef.current = loader;
  fallbackRef.current = fallback;

  const refresh = useCallback(async () => {
    const id = ++requestId.current;
    try {
      const data = await loaderRef.current();
      if (id !== requestId.current) return;
      if (!Array.isArray(data)) throw new Error("Unexpected content response");
      setItems(data);
    } catch {
      if (id !== requestId.current) return;
      setItems((current) => (current.length > 0 ? current : fallbackRef.current));
    } finally {
      if (id === requestId.current) setReady(true);
    }
  }, []);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };

    void refresh();
    window.addEventListener("focus", onVisible);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      requestId.current += 1;
      window.removeEventListener("focus", onVisible);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  return { items, ready };
}
