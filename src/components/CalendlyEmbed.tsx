"use client";

import Script from "next/script";

export function CalendlyEmbed({ url }: { url: string }) {
  return (
    <>
      {/* Calendly inline widget begin */}
      <div
        className="calendly-inline-widget w-full"
        data-url={url}
        style={{ minWidth: 320, height: 700 }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      {/* Calendly inline widget end */}
    </>
  );
}
