// ===== Tabs =====
const tabDoc = document.getElementById("tabDoc");
const tabReq = document.getElementById("tabReq");
const docSec = document.getElementById("documentSection");
const reqSec = document.getElementById("requisitesSection");
const shareBtn = document.getElementById("shareBtn");

tabDoc.onclick = () => {
  tabDoc.classList.add("active");
  tabReq.classList.remove("active");
  docSec.classList.remove("hidden");
  reqSec.classList.add("hidden");
  shareBtn.classList.add("hidden");
};

tabReq.onclick = () => {
  tabReq.classList.add("active");
  tabDoc.classList.remove("active");
  docSec.classList.add("hidden");
  reqSec.classList.remove("hidden");
  shareBtn.classList.remove("hidden");
};

// ===== Pinch Zoom FIX =====
const pz = new PinchZoom.default(
  document.querySelector('.photo-wrapper'),
  { draggableUnzoomed: false }
);

// ===== QR =====
const openBtn = document.getElementById("openAccessBtn");
const overlay = document.getElementById("qrOverlay");
const sheet = document.getElementById("qrSheet");
const timerEl = document.getElementById("timer");
const shortCodeEl = document.getElementById("shortCode");

let interval;
let seconds = 60;

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

function startTimer() {
  seconds = 60;
  timerEl.innerText = `Действителен ${seconds} сек`;

  interval = setInterval(() => {
    seconds--;
    timerEl.innerText = `Действителен ${seconds} сек`;

    if (seconds <= 0) {
      clearInterval(interval);
      shortCodeEl.innerText = generateCode();
      startTimer();
    }
  }, 1000);
}

openBtn.onclick = () => {
  overlay.classList.remove("hidden");
  setTimeout(() => sheet.classList.add("active"), 10);

  shortCodeEl.innerText = generateCode();

  new QRCode(document.getElementById("qrcode"), {
    text: "ID-" + shortCodeEl.innerText,
    width: 200,
    height: 200
  });

  startTimer();
};

// ===== Swipe Down Close =====
let startY = 0;

sheet.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

sheet.addEventListener("touchmove", e => {
  let moveY = e.touches[0].clientY;
  if (moveY - startY > 100) closeQR();
});

function closeQR() {
  sheet.classList.remove("active");
  setTimeout(() => overlay.classList.add("hidden"), 300);
  clearInterval(interval);
}
