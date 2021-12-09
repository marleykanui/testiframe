import { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const IFRAME_ID = "my-iframe";
  useEffect(() => {
    // Iframe containing AR content.
    const onLoad = () => {
      window.XRIFrame.registerXRIFrame(IFRAME_ID);
    };
    window.addEventListener("load", onLoad, false);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <script src="//cdn.8thwall.com/web/iframe/iframe.js"></script>
      </Head>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <iframe
          id="my-iframe"
          style={{ height: "50%", width: "50%" }}
          allow="camera;microphone;gyroscope;accelerometer;"
          src="https://d2odbxwfe3i8mn.cloudfront.net/"
        ></iframe>
      </div>
    </div>
  );
}
