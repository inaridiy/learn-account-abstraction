import Script from "next/script";

export const Analytics = () => {
  return (
    <>
      <Script
        async
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-4VE4MY4EKG"
      ></Script>
      <Script
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
