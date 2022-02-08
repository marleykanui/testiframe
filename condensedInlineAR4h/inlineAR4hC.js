// IFRAME SOURCE
const IFRAME_URL = "https://d2upca0600ogrl.cloudfront.net/";

// iFrame Element
const IFRAME_ID = "iframe-4h";

// Grab initial window size
let height;

// CSS References
const INLINE_AR_CONTAINER = "inline-ar";
const HIDE = "hide";
const SHOW = "show";
const STOP_BTN = "stop-btn";
const START_BTN = "start-btn-container";
const FULLSCREEN_INLINE_AR = "fullscreen-inline-ar";

// Create startAR function to register the XRIFrame:
const startAR = () => {
  // Register Iframe
  window.XRIFrame.registerXRIFrame(IFRAME_ID);

  // Set Iframe Source
  const iframe = document.getElementById(IFRAME_ID);
  iframe.setAttribute("src", IFRAME_URL);

  // Hide start Button
  const startBtn = document.getElementById(START_BTN);
  startBtn.classList.toggle(HIDE);

  // Show Close Button
  const stopBtn = document.getElementById(STOP_BTN);
  stopBtn.classList.toggle(SHOW);

  // Make Inline AR Full Screen
  const INLINE_AR = document.getElementById(INLINE_AR_CONTAINER);
  INLINE_AR.classList.toggle(FULLSCREEN_INLINE_AR);
  INLINE_AR.style.height = `${height}px`;

  // Prevent Scrolling while in full screen
  const body = document.getElementsByTagName("BODY")[0];
  body.style.overflow = "hidden";
};

const stopAR = () => {
  // Deregister Iframe
  window.XRIFrame.deregisterXRIFrame();

  // Set iFrame Source back to empty string
  const iframe = document.getElementById(IFRAME_ID);
  iframe.setAttribute("src", "");

  // Show start button
  const startBtn = document.getElementById(START_BTN);
  startBtn.classList.toggle(HIDE);

  // Hide stop button
  const stopBtn = document.getElementById(STOP_BTN);
  stopBtn.classList.toggle(SHOW);

  // Make Inline AR Back to original size
  const INLINE_AR = document.getElementById(INLINE_AR_CONTAINER);
  INLINE_AR.classList.toggle(FULLSCREEN_INLINE_AR);
  INLINE_AR.style.height = "700px";

  // Enable Scrolling
  const body = document.getElementsByTagName("BODY")[0];
  body.style.overflow = "visible";
};

const setWindowHeight = () => {
  height = window.innerHeight;
};

window.addEventListener("load", setWindowHeight, false);
