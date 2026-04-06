"use client";

import { useCallback, useState } from "react";

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  assets: GitHubAsset[];
}

function detectArch(): "arm64" | "x64" {
  // Try modern API first (Chrome/Edge)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = navigator as any;
  if (nav.userAgentData) {
    const arch = nav.userAgentData.architecture;
    if (arch === "arm") return "arm64";
    if (arch === "x86") return "x64";
  }

  // Check WebGL renderer for Apple Silicon GPU
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (gl) {
      const dbgExt = gl.getExtension("WEBGL_debug_renderer_info");
      if (dbgExt) {
        const renderer = gl.getParameter(dbgExt.UNMASKED_RENDERER_WEBGL);
        if (/Apple M\d|Apple GPU/i.test(renderer)) return "arm64";
      }
    }
  } catch {
    // ignore
  }

  // Check userAgent for ARM hints
  if (/aarch64|arm64/i.test(navigator.userAgent)) return "arm64";

  // Default to arm64 since most modern Macs are Apple Silicon
  return "arm64";
}

export default function DownloadButton({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const arch = detectArch();
      const suffix = `_${arch}.dmg`;

      const res = await fetch(
        "https://api.github.com/repos/team9ai/team9/releases/latest"
      );
      const data: GitHubRelease = await res.json();

      const asset = data.assets.find(
        (a) => a.name.endsWith(suffix) && a.name.startsWith("Team9_")
      );

      if (asset) {
        window.location.href = asset.browser_download_url;
      } else {
        // Fallback to releases page
        window.open(
          "https://github.com/team9ai/team9/releases/latest",
          "_blank"
        );
      }
    } catch {
      window.open(
        "https://github.com/team9ai/team9/releases/latest",
        "_blank"
      );
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return (
    <button
      aria-label="Download Team9 for Mac"
      className={className}
      onClick={handleDownload}
      disabled={loading}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      {loading ? "..." : label}
    </button>
  );
}
