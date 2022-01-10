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
  const STOPFULL_ID = "stop-full";
  const START_BTN_ID = "start-btn-container";
  const STOP_BTN_ID = "stopBtn";
  const FULLSCREEN_BTN = "fullscreenBtn";
  const FULLSCREEN_INLINEAR = "fullscreen-inline-ar";
  const FULLSCREEN_CONTROLS_CLASS = "size-full";
  const FULLSCREEN_ICON = "fullscreen-icon";
  const FULLSCREEN_COLLAPSE = "fullscreenImgCollapse";

  // Create startAR function to register the XRIFrame:
  const startAR = () => {
    // Register Iframe
    window.XRIFrame.registerXRIFrame(IFRAME_ID);

    // Set Iframe Source
    const iframe = document.getElementById(IFRAME_ID);
    iframe.setAttribute("src", IFRAME_URL);

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

      const inlineAR = document.getElementById(IFRAME_ID);
      inlineAR.classList.toggle(FULLSCREEN_INLINEAR);

      // Toggle fullscreen icon back to expand
      const fullscreenIcon = document.getElementById(FULLSCREEN_ICON);
      fullscreenIcon.classList.toggle(FULLSCREEN_COLLAPSE);

      // Toggle stopFull position
      const stopFull = document.getElementById(STOPFULL_ID);
      stopFull.classList.toggle(FULLSCREEN_CONTROLS_CLASS);
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
    const inlineAR = document.getElementById(IFRAME_ID);
    inlineAR.classList.toggle(FULLSCREEN_INLINEAR);

    // Toggle stopFull position
    const stopFull = document.getElementById(STOPFULL_ID);
    stopFull.classList.toggle(FULLSCREEN_CONTROLS_CLASS);

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
            <button id="startBtn" onClick={startAR}>
              <div id="startImg"></div>
            </button>
          </div>
          <div id="stop-full" className="size-collapsed">
            <button id="stopBtn" onClick={stopAR}>
              <div id="stopImg"></div>
            </button>
            <button id="fullscreenBtn" onClick={toggleFullscreen}>
              <div id="fullscreen-icon" className="fullscreenImgExpand"></div>
            </button>
          </div>
        </div>
        <iframe
          id="iframe-4h"
          allow="camera;microphone;gyroscope;accelerometer;xr-spatial-tracking;"
        ></iframe>
      </div>
      <div className="tempButtons">
        <button onClick={toggleFullscreen}>FS</button>
        <button onClick={startAR}>S</button>
        <button onClick={stopAR}>S</button>
      </div>
    </div>
  );
}
