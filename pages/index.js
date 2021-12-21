import { useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const IFRAME_ID = "my-iframe";
  const CONTROLS_ID = "iframeControls";
  const START_BTN_ID = "startBtn";
  const INNER_FRAME_URL = "https://d2odbxwfe3i8mn.cloudfront.net/";
  const STOP_BTN_ID = "stopBtn";
  const EXPAND_BTN_ID = "expandBtn";
  const FULLSCREEN_IFRAME_CLASS = "fullscreen-iframe";
  const FULLSCREEN_CONTROLS_CLASS = "fullscreen-iframeControls";
  const FULLSCREEN_EXPAND_BTN_CLASS = "fullscreen-btn";
  const FULLSCREEN_STOP_BTN_CLASS = "hidden";

  const createObserver = () => {
    let cameraActive;
    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (cameraActive && !entry.isIntersecting) {
          stopAR();
          cameraActive = false;
        }
      });
    };
    window.addEventListener("message", (event) => {
      if (event.data === "acceptedCamera") {
        cameraActive = true;
      }
    });
    const options = { threshold: 0.2 };
    new IntersectionObserver(handleIntersect, options).observe(
      document.getElementById(IFRAME_ID)
    );
  };

  useEffect(() => {
    const onLoad = () => {
      createObserver();
    };
    window.addEventListener("load", onLoad, false);
    document
      .getElementById(EXPAND_BTN_ID)
      .classList.toggle(FULLSCREEN_STOP_BTN_CLASS);
    document
      .getElementById(STOP_BTN_ID)
      .classList.toggle(FULLSCREEN_STOP_BTN_CLASS);
  }, []);

  // Handles fullscreen button behavior
  const toggleFullscreen = () => {
    document
      .getElementById(IFRAME_ID)
      .classList.toggle(FULLSCREEN_IFRAME_CLASS);
    document
      .getElementById(CONTROLS_ID)
      .classList.toggle(FULLSCREEN_CONTROLS_CLASS);
    document
      .getElementById(EXPAND_BTN_ID)
      .classList.toggle(FULLSCREEN_EXPAND_BTN_CLASS);
    document
      .getElementById(STOP_BTN_ID)
      .classList.toggle(FULLSCREEN_STOP_BTN_CLASS);
  };

  const startAR = () => {
    // registers the XRIFrame by iframe ID
    window.XRIFrame.registerXRIFrame(IFRAME_ID);
    const iframe = document.getElementById(IFRAME_ID);
    const controls = document.getElementById(CONTROLS_ID);
    const startBtn = document.getElementById(START_BTN_ID);
    startBtn.classList.add("fade-out");
    // checks if camera has been accepted in iframe before displaying controls
    window.addEventListener("message", (event) => {
      if (event.data !== "acceptedCamera") {
        return;
      }
      controls.style.opacity = 0;
      const styleCleanup = setTimeout(() => {
        startBtn.style.display = "none";
        poweredByLogo.style.display = "none";
        controls.style.display = "block";
      }, 300);
      const uiFadeIn = setTimeout(() => {
        controls.classList.add("fade-in");
      }, 800);
      setTimeout(() => {
        clearTimeout(styleCleanup);
        clearTimeout(uiFadeIn);
      }, 900);
    });
    iframe.setAttribute("src", INNER_FRAME_URL);
    document
      .getElementById(EXPAND_BTN_ID)
      .classList.toggle(FULLSCREEN_STOP_BTN_CLASS);
    document
      .getElementById(STOP_BTN_ID)
      .classList.toggle(FULLSCREEN_STOP_BTN_CLASS);
  };

  const stopAR = () => {};

  return (
    <div className="content">
      <Head>
        <script src="//cdn.8thwall.com/web/iframe/iframe.js"></script>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        ></meta>
      </Head>
      <div className="content">
        <h1>File Size Visualizer - 4H</h1>

        <p className="author">Groove Jones</p>

        <p id="date">
          <br />
        </p>

        <p>
          Officia dolor qui tempor laboris ea. Adipisicing ut laboris veniam
          excepteur mollit est quis officia proident sunt qui culpa pariatur
          aute. Non adipisicing aute ut excepteur labore elit. Quis quis culpa
          dolore excepteur ad do. Id proident irure eiusmod irure irure fugiat
          aliqua. Lorem enim nostrud quis nulla proident minim laboris Lorem
          amet laborum. Nostrud cupidatat fugiat laborum ut adipisicing esse
          adipisicing ad. Commodo minim eu aute voluptate exercitation pariatur
          ea culpa proident occaecat pariatur. Deserunt ex aliqua nulla enim
          incididunt culpa sit nulla enim aliquip. In Lorem Lorem consequat
          exercitation eiusmod ut magna ut exercitation laboris anim pariatur
          reprehenderit irure.
        </p>

        <p>
          Tempor nisi et sint ea. Ullamco sint aute ex exercitation nisi. Lorem
          ad voluptate consequat laborum proident reprehenderit ad magna sunt
          commodo ex incididunt. Consectetur reprehenderit do velit pariatur.
          Anim incididunt ad nulla ullamco. Est commodo sint laborum
          reprehenderit. Pariatur fugiat dolore duis tempor nulla deserunt ipsum
          qui non aliquip excepteur officia in. Irure aliqua tempor consequat
          laborum excepteur laboris aute laborum. Anim consectetur esse
          reprehenderit et incididunt voluptate enim adipisicing proident.
          Commodo sint cupidatat quis veniam dolor et sint voluptate.
        </p>
      </div>
      <div id="inline-ar">
        <button id="startBtn" onClick={startAR}>
          START
        </button>

        <div id="iframeControls">
          <button id="expandBtn" onClick={toggleFullscreen}>
            <div id="expandImg"></div>
          </button>
          <button id="stopBtn" onClick={stopAR}>
            <div id="stopImg"></div>
          </button>
        </div>
        <iframe
          id="my-iframe"
          allow="camera;microphone;gyroscope;accelerometer;xr-spatial-tracking;"
        ></iframe>
      </div>
      <div className="content">
        <p>
          Esse amet elit ullamco adipisicing est magna sunt exercitation
          voluptate mollit ut. Ut et sunt enim proident ad dolore. Sit aliquip
          veniam deserunt sit exercitation velit nostrud. Eiusmod anim elit enim
          aliquip deserunt Lorem dolor. Fugiat elit sit irure sunt esse elit
          elit ut sint cillum fugiat tempor sit. Veniam incididunt voluptate
          nisi anim ad aliqua. Consequat officia fugiat sit duis cupidatat irure
          fugiat deserunt. Veniam laborum exercitation in dolore amet ipsum ut
          anim. Do quis elit aliquip consectetur in eiusmod reprehenderit sit
          proident irure labore. Et dolore adipisicing irure est aute incididunt
          exercitation minim ea.
        </p>

        <p>
          Elit velit Lorem aliquip nostrud nisi cupidatat tempor ullamco amet.
          Culpa laborum exercitation ipsum laboris quis eu labore non id mollit
          elit et. Nostrud nulla aliquip do duis esse dolor nulla Lorem ad qui
          fugiat. Quis labore incididunt sit qui occaecat duis aliquip ipsum
          tempor esse et dolore. Eu eiusmod non do et esse reprehenderit Lorem
          enim. Exercitation aliquip magna ex commodo culpa id elit pariatur eu
          exercitation est mollit reprehenderit sit. Lorem irure irure ea esse
          officia reprehenderit labore sunt nisi pariatur minim aliqua. Id sint
          officia enim labore ut velit eu Lorem irure proident. In veniam est
          culpa exercitation pariatur. Duis eiusmod reprehenderit incididunt
          sunt tempor. Excepteur mollit deserunt qui do aliqua ut exercitation
          sit sunt reprehenderit pariatur adipisicing. Laborum exercitation
          fugiat pariatur commodo quis eiusmod veniam laboris et consectetur
          aute magna commodo adipisicing. Qui nulla excepteur amet amet aliqua
          fugiat veniam laborum ut esse voluptate adipisicing exercitation eu.
          Officia commodo sint do nisi aliquip amet aute veniam aliquip aliqua
          dolore exercitation ea.
        </p>
      </div>
    </div>
  );
}
