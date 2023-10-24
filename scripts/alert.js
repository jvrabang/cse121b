// filename: alert.js
// wrapper function for querySelector
export function qs(selector) {
    return document.querySelector(selector);
  }
  
  // Function to create a container for alerts if it doesn't exist
  function createAlertContainer() {
    const container = document.createElement("div");
    container.classList.add("alert-container");
    container.setAttribute(
      "style",
      "position: fixed; top: 0; left: 0; right: 0; display: flex; flex-direction: column; align-items: center; z-index: 9999;"
    );
    document.body.appendChild(container);
    return container;
  }
  
  // create an alert at the top of the page for 7 seconds
  // requires the message to be displayed and the time in milliseconds.
  export function alertMessage(message, duration = 7000) {
    // Get or create the alert container
    const alertContainer = qs(".alert-container") || createAlertContainer();
  
    const alert = document.createElement("p");
    alert.innerHTML = message;
    alert.setAttribute(
      "style",
      "background-color: lightpink; border: 1px solid red; padding: 1em; margin: 5px; width: 500px;"
    );
  
    // Insert the new alert at the beginning of the container
    alertContainer.insertBefore(alert, alertContainer.firstChild);
  
    setTimeout(function () {
      alertContainer.removeChild(alert);
    }, duration);
  }
  