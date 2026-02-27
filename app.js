const tabDoc = document.getElementById("tabDoc");
const tabReq = document.getElementById("tabReq");
const docSection = document.getElementById("docSection");
const reqSection = document.getElementById("reqSection");
const openBtn = document.getElementById("openBtn");
const shareBtn = document.getElementById("shareBtn");

tabDoc.onclick = () => {
  tabDoc.classList.add("active");
  tabReq.classList.remove("active");
  docSection.classList.remove("hidden");
  reqSection.classList.add("hidden");
  openBtn.classList.remove("hidden");
  shareBtn.classList.add("hidden");
};

tabReq.onclick = () => {
  tabReq.classList.add("active");
  tabDoc.classList.remove("active");
  docSection.classList.add("hidden");
  reqSection.classList.remove("hidden");
  openBtn.classList.add("hidden");
  shareBtn.classList.remove("hidden");
};

// ===== QR =====

const overlay = document.getElementById("qrOverlay");
const sheet = document.getElementById("qrSheet");
const timerEl = document.getElementById("timer");
const codeEl = document.getElementById("code");

let interval;
let time = 60;

function newCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

function startTimer() {
  time = 60;
  timerEl.innerText = "Действителен " + time + " сек";

  interval = setInterval(() => {
    time--;
    timerEl.innerText = "Действителен " + time + " сек";
    if (time <= 0) {
      clearInterval(interval);
      generateQR();
    }
  }, 1000);
}

function generateQR() {
  document.getElementById("qrcode").innerHTML = "";
  let code = newCode();
  codeEl.innerText = code;

  new QRCode(document.getElementById("qrcode"), {
    text: "ID-" + code,
    width: 200,
    height: 200
  });

  startTimer();
}

openBtn.onclick = () => {
  overlay.classList.remove("hidden");
  setTimeout(() => sheet.classList.add("active"), 10);
  generateQR();
};

// swipe down close
let startY = 0;

sheet.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

sheet.addEventListener("touchmove", e => {
  let moveY = e.touches[0].clientY;
  if (moveY - startY > 120) closeQR();
});

function closeQR() {
  sheet.classList.remove("active");
  setTimeout(() => overlay.classList.add("hidden"), 300);
  clearInterval(interval);
}
