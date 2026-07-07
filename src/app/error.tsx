"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    const isChunkError =
      error.name === "ChunkLoadError" ||
      /Loading chunk [\d]+ failed/.test(error.message) ||
      /Failed to fetch dynamically imported module/.test(error.message);

    if (isChunkError) {
      const key = "chunk-reload-attempted";
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        window.location.reload();
      }
    }
  }, [error]);

  return <div>Something went wrong. Refreshing…</div>;
}
