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
          // overflow: " scroll",
          // display: "flex",
          // alignItems: "center",
        }}
      >
        <div style={{ float: "right" }}>
          Commodo laboris veniam duis id aute duis esse fugiat incididunt mollit
          nostrud. Amet aliquip ipsum excepteur occaecat. Nulla esse nulla
          nostrud incididunt. Dolore do culpa esse in sunt aute proident sit.
          Labore consectetur elit ad in Lorem tempor aliqua non qui in. Dolor
          proident ea aute magna nostrud sunt officia laborum culpa officia.
          Anim mollit Lorem elit pariatur tempor et dolore nulla sint. Eu non
          est magna qui cillum laboris dolor incididunt nulla nostrud ad ea.
          Elit laborum adipisicing ut id non. Proident consequat enim magna sunt
          nostrud ut et velit ipsum ipsum fugiat deserunt.
        </div>
        <iframe
          id="my-iframe"
          style={{ width: "40rem", height: "20rem" }}
          allow="camera;microphone;gyroscope;accelerometer;"
          src="https://d2odbxwfe3i8mn.cloudfront.net/"
        ></iframe>
        <div style={{ float: "left" }}>
          Magna ut aute mollit non exercitation exercitation ad. Veniam anim sit
          officia reprehenderit occaecat non enim. Elit duis est occaecat labore
          amet aute. Reprehenderit nostrud dolore sunt officia et est occaecat.
          Excepteur officia fugiat amet nulla aliquip amet Lorem cupidatat magna
          ut aute culpa. Veniam enim mollit proident mollit minim adipisicing
          adipisicing in anim enim ad veniam exercitation ullamco. Occaecat
          culpa irure laboris quis minim culpa sit tempor reprehenderit culpa
          aute. Sint in pariatur aute cillum voluptate.
        </div>
      </div>
    </div>
  );
}
