import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {process.env.ACKEE_SERVER && process.env.ACKEE_DOMAIN_ID ? (
          <script
            async
            src={`${process.env.ACKEE_SERVER}/tracker.js`}
            data-ackee-server={process.env.ACKEE_SERVER}
            data-ackee-domain-id={process.env.ACKEE_DOMAIN_ID}
          ></script>
        ) : (
          <></>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
