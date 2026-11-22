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

/** Keep saved rows and built-in rows together without reordering visible cards. */
function mergePublished<T>(remote: T[], local: T[], current: T[]): T[] {
  const remoteList = Array.isArray(remote) ? remote : [];
  const localList = Array.isArray(local) ? local : [];
  const currentList = Array.isArray(current) ? current : [];

  const ordered: T[] = [];
  const pushUnique = (item: T) => {
    if (!item || ordered.some((existing) => sameItem(existing, item))) return;
    const remoteMatch = remoteList.find((candidate) => sameItem(candidate, item));
    const localMatch = localList.find((candidate) => sameItem(candidate, item));
    ordered.push((remoteMatch || localMatch || item) as T);
  };

  // Preserve what user already sees first, then fill any missing published/fallback items.
  for (const item of currentList) pushUnique(item);
  for (const item of remoteList) pushUnique(item);
  for (const item of localList) pushUnique(item);

  return ordered;
}

function stableSignature(items: unknown[]) {
  return JSON.stringify(
    items.map((item) => {
      if (!item || typeof item !== "object") return item;
      const row = item as Record<string, unknown>;
      return {
        id: row._id ?? row.id ?? "",
        title: row.title ?? row.name ?? "",
        link: row.link ?? "",
        imageUrl: row.imageUrl ?? row.image_url ?? "",
        description: row.description ?? row.testimonial ?? "",
        detail: row.detail ?? "",
        date: row.date ?? "",
        priority: row.priority ?? 0,
      };
    })
  );
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
  const itemsRef = useRef(items);
  const requestId = useRef(0);

  loaderRef.current = loader;
  fallbackRef.current = fallback;
  itemsRef.current = items;

  const refresh = useCallback(async () => {
    const id = ++requestId.current;
    try {
      const data = await loaderRef.current();
      if (id !== requestId.current) return;
      if (!Array.isArray(data)) throw new Error("Unexpected content response");
      const next = mergePublished(data, fallbackRef.current, itemsRef.current);
      const resolved = next.length > 0 ? next : fallbackRef.current;
      if (stableSignature(resolved as unknown[]) !== stableSignature(itemsRef.current as unknown[])) {
        setItems(resolved);
      }
    } catch {
      if (id !== requestId.current) return;
      // Keep existing content on transient errors to avoid flash-to-fallback.
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
