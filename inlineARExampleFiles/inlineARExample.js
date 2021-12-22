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
window.addEventListener("load", createObserver, false);
