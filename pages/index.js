import { useEffect } from "react";
import Head from "next/head";

export default function Home() {
  // IFRAME SOURCE
  const IFRAME_URL = "https://d2upca0600ogrl.cloudfront.net/";

  // iFrame Element
  const IFRAME_ID = "iframe-4h";

  // FullScreen State
  let FULLSCREEN = false;

  // IFRAME ACTIVE STATE
  let ACTIVE = false;

  // Grab initial window size
  const height = window.innerHeight;

  // CSS References
  const HIDE = "hide";
  const SHOW = "show";
  const STOP_BTN = "stop-btn";
  const STOP_FULL_SIZE = "size-full";
  const STOP_FULL_CONTROLS = "stop-full";
  const START_BTN = "start-btn-container";
  const FULLSCREEN_BTN = "fullscreen-btn";
  const FULLSCREEN_ICON = "fullscreen-icon";
  const FULLSCREEN_INLINE_AR = "fullscreen-inline-ar";
  const FULLSCREEN_COLLAPSE = "fullscreen-img-collapse";

  // Create startAR function to register the XRIFrame:
  const startAR = () => {
    // Register Iframe
    window.XRIFrame.registerXRIFrame(IFRAME_ID);

    ACTIVE = true;

    // Set Iframe Source
    const iframe = document.getElementById(IFRAME_ID);
    iframe.setAttribute("src", IFRAME_URL);

    // Toggle startBtn visibility
    const startBtn = document.getElementById(START_BTN);
    startBtn.classList.toggle(HIDE);

    // Toggle stop-btn visibility
    const stopBtn = document.getElementById(STOP_BTN);
    stopBtn.classList.toggle(SHOW);

    // Toggle fullscreen-btn visibility
    const fullscreenBtn = document.getElementById(FULLSCREEN_BTN);
    fullscreenBtn.classList.toggle(SHOW);
  };

  const stopAR = () => {
    // Deregister Iframe
    window.XRIFrame.deregisterXRIFrame();

    ACTIVE = false;

    // Set iFrame Source back to empty string
    const iframe = document.getElementById(IFRAME_ID);
    iframe.setAttribute("src", "");

    // Toggle startBtn visibility
    const startBtn = document.getElementById(START_BTN);
    startBtn.classList.toggle(HIDE);

    // Toggle stop-btn visibility
    const stopBtn = document.getElementById(STOP_BTN);
    stopBtn.classList.toggle(SHOW);

    // Toggle fullscreen-btn visibility
    const fullscreenBtn = document.getElementById(FULLSCREEN_BTN);
    fullscreenBtn.classList.toggle(SHOW);

    // If we close while in fullscreen mode
    if (FULLSCREEN) {
      FULLSCREEN = false;

      const iframeID = document.getElementById(IFRAME_ID);
      iframeID.classList.toggle(FULLSCREEN_INLINE_AR);

      // Toggle fullscreen icon back to expand
      const fullscreenIcon = document.getElementById(FULLSCREEN_ICON);
      fullscreenIcon.classList.toggle(FULLSCREEN_COLLAPSE);

      // Toggle stopFull position
      const stopFull = document.getElementById(STOP_FULL_CONTROLS);
      stopFull.classList.toggle(STOP_FULL_SIZE);

      // GRAB BODY
      const body = document.getElementsByTagName("BODY")[0];
      body.style.overflow = "visible";
    }
  };

  // Handles fullscreen button behavior
  const toggleFullscreen = () => {
    const iframeID = document.getElementById(IFRAME_ID);
    const body = document.getElementsByTagName("BODY")[0];
    const html = document.getElementsByTagName("HTML")[0];
    console.log(window.innerHeight);
    // Set full screen state based on current full screen state
    if (!FULLSCREEN) {
      FULLSCREEN = true;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      iframeID.style.height = `${height}px`;
    } else {
      FULLSCREEN = false;
      html.style.overflow = "visible";
      body.style.overflow = "visible";
      iframeID.style.height = "700px";
    }

    // Toggle iFrame size
    iframeID.classList.toggle(FULLSCREEN_INLINE_AR);

    // Toggle stopFull position
    const stopFull = document.getElementById(STOP_FULL_CONTROLS);
    stopFull.classList.toggle(STOP_FULL_SIZE);

    // Toggle fullscreen icon
    const fullscreenIcon = document.getElementById(FULLSCREEN_ICON);
    fullscreenIcon.classList.toggle(FULLSCREEN_COLLAPSE);
  };

  const createObserver = () => {
    let cameraActive;

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (cameraActive && !entry.isIntersecting) {
          if (ACTIVE) {
            stopAR();
          }
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
    window.addEventListener("load", createObserver, false);
  }, []);

  return (
    <div id="container">
      <Head>
        <script src="//cdn.8thwall.com/web/iframe/iframe.js"></script>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        ></meta>
      </Head>
      <div id="inline-ar" className="inline-ar-size">
        <div id="iframeControls">
          <div id="start-btn-container" className="inline-ar-size">
            <button id="start-btn" onClick={startAR}>
              <div id="start-img"></div>
            </button>
          </div>
          <div id="stop-full" className="size-collapsed">
            <button id="stop-btn" onClick={stopAR}>
              <div id="stop-img"></div>
            </button>
            <button id="fullscreen-btn" onClick={toggleFullscreen}>
              <div id="fullscreen-icon" className="fullscreen-img-expand"></div>
            </button>
          </div>
        </div>
        <iframe
          id="iframe-4h"
          allow="camera;microphone;gyroscope;accelerometer;xr-spatial-tracking;"
        ></iframe>
      </div>
    </div>
  );
}
