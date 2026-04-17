"use client";

import { useEffect, useRef } from "react";
import { usePostHogClient } from "@/utils/analytics/provider";
import { captureWithBridge } from "@/utils/analytics/capture";
import { EVENTS } from "@/utils/analytics/events";

export default function HomeViewTracker() {
  const client = usePostHogClient();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    if (!client) return;
    firedRef.current = true;
    captureWithBridge(client, EVENTS.HOME_VIEWED, { page_key: "home" });
  }, [client]);

  return null;
}
