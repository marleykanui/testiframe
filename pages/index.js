import { useEffect } from "react";
import Head from "next/head";

export default function Home() {
  // iFrame Element
  const IFRAME_ID = "iframe-4h";

  // FullScreen State
  let FULLSCREEN = false;

  // IFRAME SOURCE
  const IFRAME_URL = "https://d2upca0600ogrl.cloudfront.net/";

  // CSS References
  const HIDE = "hide";
  const SHOW = "show";
  const CONTROLS_ID = "iframeControls";
  const START_BTN_ID = "startBtn";
  const STOP_BTN_ID = "stopBtn";
  const FULLSCREEN_BTN = "fullscreenBtn";
  const FULLSCREEN_IFRAME_CLASS = "fullscreen-iframe";
  const FULLSCREEN_CONTROLS_CLASS = "fullscreen-iframeControls";
  const FULLSCREEN_ICON = "fullscreen-icon";
  const FULLSCREEN_COLLAPSE = "fullscreenImgCollapse";

  // Create startAR function to register the XRIFrame:
  const startAR = () => {
    // Register Iframe
    window.XRIFrame.registerXRIFrame(IFRAME_ID);

    // Set Iframe Source
    const iframe = document.getElementById(IFRAME_ID);
    iframe.setAttribute("src", IFRAME_URL);

    // Below are examples simply toggling the css "display"
    // properties between "block" and "none", but any logic
    // or animations can be triggered on startAR for:
    // - Remove start button from DOM
    // - Add AR stop button in DOM
    // - Add AR fullscreen toggle button in DOM

    // Toggle startBtn visibility
    const startBtn = document.getElementById(START_BTN_ID);
    startBtn.classList.toggle(HIDE);

    // Toggle stopBtn visibility
    const stopBtn = document.getElementById(STOP_BTN_ID);
    stopBtn.classList.toggle(SHOW);

    // Toggle fullscreenBtn visibility
    const fullscrenBtn = document.getElementById(FULLSCREEN_BTN);
    fullscrenBtn.classList.toggle(SHOW);
  };

  const stopAR = () => {
    // Deregister Iframe
    window.XRIFrame.deregisterXRIFrame();

    // Set iFrame Source back to empty string
    const iframe = document.getElementById(IFRAME_ID);
    iframe.setAttribute("src", "");

    // Below are examples simply toggling the css "display"
    // properties between "block" and "none", but any logic
    // or animations can be triggered on stopAR for:
    // - Add back in start button in DOM
    // - Remove AR stop button from DOM
    // - Remove AR fullscreen toggle button from DOM

    // Toggle startBtn visibility
    const startBtn = document.getElementById(START_BTN_ID);
    startBtn.classList.toggle(HIDE);

    // Toggle stopBtn visibility
    const stopBtn = document.getElementById(STOP_BTN_ID);
    stopBtn.classList.toggle(SHOW);

    // Toggle fullscreenBtn visibility
    const fullscrenBtn = document.getElementById(FULLSCREEN_BTN);
    fullscrenBtn.classList.toggle(SHOW);

    // If we close while in fullscreen mode
    if (FULLSCREEN) {
      FULLSCREEN = false;

      // Toggle iFrame size back to inline size
      const iframe = document.getElementById(IFRAME_ID);
      iframe.classList.toggle(FULLSCREEN_IFRAME_CLASS);

      // Toggle controls position back to inline size
      const controls = document.getElementById(CONTROLS_ID);
      controls.classList.toggle(FULLSCREEN_CONTROLS_CLASS);

      // Toggle fullscreen icon back to expand
      const fullscreenIcon = document.getElementById(FULLSCREEN_ICON);
      fullscreenIcon.classList.toggle(FULLSCREEN_COLLAPSE);
    }
  };

  // Handles fullscreen button behavior
  const toggleFullscreen = () => {
    // Set full screen state based on current full screen state
    if (!FULLSCREEN) {
      FULLSCREEN = true;
    } else {
      FULLSCREEN = false;
    }

    // Toggle iFrame size
    const iframe = document.getElementById(IFRAME_ID);
    iframe.classList.toggle(FULLSCREEN_IFRAME_CLASS);

    // Toggle controls  size
    const controls = document.getElementById(CONTROLS_ID);
    controls.classList.toggle(FULLSCREEN_CONTROLS_CLASS);

    // Toggle fullscreen icon
    const fullscreenIcon = document.getElementById(FULLSCREEN_ICON);
    fullscreenIcon.classList.toggle(FULLSCREEN_COLLAPSE);
  };

  // Create createObserver function to watch if user scrolls past
  // iFrame in either direction
  const createObserver = () => {
    // Camera active state
    let cameraActive;

    // Create handleIntersect function to check cameraActive state
    // when Intersection observer threshold is past
    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        // If past intersecting point stop AR and deactivate camera
        if (cameraActive && !entry.isIntersecting) {
          stopAR();
          cameraActive = false;
        }
      });
    };

    // Add listener to listen for accepted camera message from inner iFrame
    window.addEventListener("message", (event) => {
      if (event.data === "acceptedCamera") {
        cameraActive = true;
      }
    });

    // Set Intersection Observer threshold in options
    const options = { threshold: 0.2 };

    // Instantiate an Instersection observer to watch the iFrame element
    // and trigger handleIntersect function when threshold is past
    new IntersectionObserver(handleIntersect, options).observe(
      document.getElementById(IFRAME_ID)
    );
  };

  // Create global listener to invoke createOberver fuction on load
  useEffect(() => {
    window.addEventListener("load", createObserver, false);
  }, []);

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
        <div id="iframeControls">
          <button id="startBtn" onClick={startAR}>
            <div id="startImg"></div>
          </button>
          <button id="fullscreenBtn" onClick={toggleFullscreen}>
            <div id="fullscreen-icon" className="fullscreenImgExpand"></div>
          </button>
          <button id="stopBtn" onClick={stopAR}>
            <div id="stopImg"></div>
          </button>
        </div>
        <iframe
          id="iframe-4h"
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
