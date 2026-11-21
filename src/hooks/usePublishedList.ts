import { useCallback, useEffect, useRef, useState } from "react";

function identityKeys(item: unknown): string[] {
  if (!item || typeof item !== "object") return [];
  const row = item as Record<string, unknown>;
  return [row._id, row.id, row.title, row.name, row.link]
    .map((value) => String(value ?? "").trim().toLowerCase())
    .filter(Boolean);
}

function sameItem(a: unknown, b: unknown) {
  const left = identityKeys(a);
  const right = identityKeys(b);
  return left.some((key) => right.includes(key));
}

/** Keep saved rows and the built-in rows together. A saved row wins when both exist. */
function mergePublished<T>(remote: T[], local: T[]): T[] {
  const merged = [...remote];
  for (const item of local) {
    if (!merged.some((existing) => sameItem(existing, item))) merged.push(item);
  }
  return merged;
}

/**
 * Shows the built-in list immediately, then adds anything the API returns.
 * A refresh never clears the cards that are already on screen.
 */
export function usePublishedList<T>(loader: () => Promise<T[]>, fallback: T[] = []) {
  const [items, setItems] = useState<T[]>(fallback);
  const [ready, setReady] = useState(fallback.length > 0);
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
      const merged = mergePublished(data, fallbackRef.current);
      setItems(merged.length > 0 ? merged : fallbackRef.current);
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
