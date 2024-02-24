function domReady(fn) {
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      setTimeout(fn, 1000);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  domReady(function () {
    function onScanSuccess(decodeText, decodeResult) {
      alert("Your QR is: " + decodeText);

      const qrDetails = {
        qrText: decodeText,
        qrResult: decodeResult,
        timestamp: new Date().toISOString()
      };

      try {
        // Assuming 'database' is properly initialized
        const database = firebase.database();
        database.ref('scannedQRCodes').push(qrDetails);
      } catch (error) {
        console.error("Error pushing data to Firebase:", error);
      }
    }

    try {
      let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250 }
      );

      htmlscanner.render(onScanSuccess);
    } catch (error) {
      console.error("Error initializing QR code scanner:", error);
    }
  });
    



  const nav = document.querySelector(".nav"),
  searchIcon = document.querySelector("#searchIcon"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");

searchIcon.addEventListener("click", () => {
  nav.classList.toggle("openSearch");
  nav.classList.remove("openNav");
  if (nav.classList.contains("openSearch")) {
    return searchIcon.classList.replace("uil-search", "uil-times");
  }
  searchIcon.classList.replace("uil-times", "uil-search");
});

navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
  nav.classList.remove("openSearch");
  searchIcon.classList.replace("uil-times", "uil-search");
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
}); 