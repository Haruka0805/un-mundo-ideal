// Initializes Firebase using the browser SDK (no build tools required).
// Expects `window.FIREBASE_CONFIG` in `config.js`.
(function () {
  if (!window.FIREBASE_CONFIG) {
    throw new Error("FIREBASE_CONFIG is missing. Please edit knit-gallery/config.js.");
  }

  // firebase is provided by the compat scripts in each HTML page.
  window.__knit = window.__knit || {};
  const app = firebase.initializeApp(window.FIREBASE_CONFIG);
  window.__knit.db = firebase.firestore(app);
  window.__knit.storage = firebase.storage(app);
  window.__knit.auth = firebase.auth(app);
})();

