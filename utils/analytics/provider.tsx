"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { PostHog } from "posthog-js";
import { getPostHogClient } from "./posthog-client";
import { captureAcquisitionOnce } from "./acquisition";

const PostHogContext = createContext<PostHog | null>(null);

export function PostHogProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<PostHog | null>(null);

  useEffect(() => {
    let mounted = true;
    void getPostHogClient().then((resolved) => {
      if (!mounted) return;
      setClient(resolved);
      if (resolved) captureAcquisitionOnce(resolved);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <PostHogContext.Provider value={client}>{children}</PostHogContext.Provider>
  );
}

export function usePostHogClient(): PostHog | null {
  return useContext(PostHogContext);
}
