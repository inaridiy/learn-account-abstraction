"use client";

import Script from "next/script";
import { Suspense } from "react";

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        async
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-4VE4MY4EKG"
      ></Script>
      <Script
        id="ga"
        async
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-4VE4MY4EKG');`,
        }}
      ></Script>
    </>
  );
};

export const Analytics = () => {
  return (
    <Suspense>
      <GoogleAnalytics />
    </Suspense>
  );
};
