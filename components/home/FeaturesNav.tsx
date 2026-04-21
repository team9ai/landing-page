"use client";

import { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

interface Props {
  items: NavItem[];
}

export default function FeaturesNav({ items }: Props) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the intersecting entry closest to the top of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when the block's center crosses the upper portion of the viewport.
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      },
    );

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Feature sections"
      className="hidden lg:block lg:w-[180px] lg:shrink-0"
    >
      <div className="sticky top-28 flex flex-col gap-0 py-28">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`group flex items-center gap-3 rounded-lg px-4 py-3 text-left text-[11px] font-semibold tracking-[0.12em] transition-colors ${
                active
                  ? "text-[#0a0d12]"
                  : "text-[#0a0d12]/36 hover:text-[#0a0d12]/60"
              }`}
            >
              <span
                aria-hidden="true"
                className={`size-2 shrink-0 rounded-full transition-colors ${
                  active ? "bg-[#0a0d12]" : "bg-transparent"
                }`}
              />
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
