const tabDoc = document.getElementById("tabDoc");
const tabReq = document.getElementById("tabReq");
const docSection = document.getElementById("docSection");
const reqSection = document.getElementById("reqSection");

const openBtn = document.getElementById("openBtn");
const shareBtn = document.getElementById("shareBtn");

const qrBox = document.getElementById("qrBox");
const timerEl = document.getElementById("timer");
const codeEl = document.getElementById("code");

let interval;
let time = 60;

/* Tabs */
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

/* QR */
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
  qrBox.classList.remove("hidden");
  generateQR();
};

qrBox.onclick = () => {
  qrBox.classList.add("hidden");
  clearInterval(interval);
};
