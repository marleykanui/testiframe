Setting Up 8th Wall Iframe for Outer Website:

1.  Add the the iframe.js script tag in the HEAD of the OUTER site

    ```html
    <head>
      <script src="//cdn.8thwall.com/web/iframe/iframe.js"></script>
    </head>
    ```

2.  Create Global variables to reference:

    - iFrame ID:

    ```js
    const IFRAME_ID = "iframe-4h";
    ```

    - FullScreen State

    ```js
    let FULLSCREEN = false;
    ```

    - iFrame Url

    ```js
    const IFRAME_URL = "https://d2odbxwfe3i8mn.cloudfront.net/";
    ```

    ```js
    // Here you may also want to:
    // - Set relevant html and id references in variables

    // Please reference inlineARExample.js for examples of this
    ```

3.  Create startAR function to register the XRIFrame:

    ```js
    const startAR = () => {
      // Register Iframe
      window.XRIFrame.registerXRIFrame(IFRAME_ID);

      // Grab iframe element
      const iframe = document.getElementById(IFRAME_ID);

      // Set Iframe Source
      iframe.setAttribute("src", IFRAME_URL);

      // Here you will also want to:
      // - Remove start button from DOM
      // - Add AR stop button in DOM
      // - Add AR fullscreen toggle button in DOM

      // Please reference inlineARExample.js for examples
      // of toggling visibility/styles for these elements
    };
    ```

4.  Create stopAR function to de-register the XRIFrame:

    ```js
    const stopAR = () => {
      // De-register Iframe
      window.XRIFrame.deregisterXRIFrame();

      // Grab iFrame element
      const iframe = document.getElementById(IFRAME_ID);

      // Set iFrame Source back to empty string
      iframe.setAttribute("src", "");

      // Here you will also want to:
      // - Add back in start button in DOM
      // - Remove AR stop button from DOM
      // - Remove AR fullscreen toggle button from DOM
      // - Toggle iFrame size back to inline size
      // - Position control buttons back to inline size
      // - Toggle fullscreen icon back to expand

      // Please reference inlineARExample.js for examples
      // of toggling visibility/styles for these elements
    };
    ```

5.  Create toggleARFullScreen function to toggle fullscreen AR:

    ```js
    const toggleARFullScreen = () => {
      // Set full screen state based on current full screen state
      if (!FULLSCREEN) {
        FULLSCREEN = true;
      } else {
        FULLSCREEN = false;
      }
      // Here you will also want to:
      // - Toggle iFrame size
      // - Toggle control buttons container size
      // - Toggle fullscreen icon

      // Please reference inlineARExample.js for examples
      // of toggling visibility/styles for these elements
    };
    ```

6.  Create createObserver function to watch if user scrolls past iFrame in either direction:

    ```js
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
    ```

7.  Create global listener to invoke createOberver fuction on load:

    ```js
    window.addEventListener("load", createObserver, false);
    ```

8.  Create iFrame element with attributes to enable control access in AR:

    ```html
    <iframe
      id="iframe-4h"
      allow="camera;microphone;gyroscope;accelerometer;xr-spatial-tracking;"
    ></iframe>
    ```

Most Relevent CSS

```css
/* Change default 8th wall Camera/Gyro Access control prompt to 4H stylings */
.prompt-button-8w-iframe {
  border-radius: 10px !important;
}

.prompt-box-8w-iframe {
  color: black !important;
  background-color: white !important;
}

.prompt-button-8w-iframe {
  background-color: grey !important;
}
.button-primary-8w-iframe {
  background-color: #339966 !important;
}

/* The iFrame needs to given a background image or gif to show a glimpse of 
the experience to the user before launch. (in the 8th wall inline AR example
it's a gif ofthe volcano in a boiling pot of water)
*/
#iframe-4h {
  width: 100%;
  height: 700px;
  border: 0;
  background-image: url("/bgTempImage.jpg");
  background-size: cover center center;
}
```
