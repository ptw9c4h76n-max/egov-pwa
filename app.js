function showDocument() {
  document.getElementById("documentSection").classList.remove("hidden");
  document.getElementById("requisitesSection").classList.add("hidden");
  document.getElementById("tabDoc").classList.add("active");
  document.getElementById("tabReq").classList.remove("active");
}

function showRequisites() {
  document.getElementById("documentSection").classList.add("hidden");
  document.getElementById("requisitesSection").classList.remove("hidden");
  document.getElementById("tabReq").classList.add("active");
  document.getElementById("tabDoc").classList.remove("active");
}

/* ===============================
   МОДАЛЬНОЕ ОКНО + QR + СВАЙП
================================ */

const modal = document.getElementById("qrModal");
const sheet = document.getElementById("qrSheet");

let startY = 0;
let currentY = 0;
let isDragging = false;
let interval; // чтобы можно было остановить таймер

function openAccess() {
  const timerEl = document.getElementById("timer");
  const shortCodeEl = document.getElementById("shortCode");

  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.add("active");
  }, 10);

  const randomCode = Math.floor(100000 + Math.random() * 900000);
  shortCodeEl.innerText = randomCode;

  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: randomCode.toString(),
    width: 220,
    height: 220
  });

  let time = 60;
  timerEl.innerText = "Срок действия QR-кода: 01:00";

  clearInterval(interval);

  interval = setInterval(() => {
    time--;
    let seconds = time < 10 ? "0" + time : time;
    timerEl.innerText = "Срок действия QR-кода: 00:" + seconds;

    if (time <= 0) {
      closeAccess();
    }
  }, 1000);
}

function closeAccess() {
  modal.classList.remove("active");
  setTimeout(() => {
    modal.classList.add("hidden");
    sheet.style.transform = "translateY(100%)";
  }, 300);

  clearInterval(interval);
}

/* ===============================
   СВАЙП ВНИЗ ДЛЯ ЗАКРЫТИЯ
================================ */

sheet.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
  isDragging = true;
});

sheet.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  currentY = e.touches[0].clientY;
  let diff = currentY - startY;

  if (diff > 0) {
    sheet.style.transform = `translateY(${diff}px)`;
  }
});

sheet.addEventListener("touchend", () => {
  isDragging = false;

  let diff = currentY - startY;

  if (diff > 120) {
    closeAccess();
  } else {
    sheet.style.transform = "translateY(0)";
  }
});

/* ===============================
   SHARE
================================ */

async function shareData() {
  const text = `
ФИО: ТВОЁ ФИО
ИИН: 123456789012
Дата рождения: 01.01.2000
`;

  if (navigator.share) {
    await navigator.share({
      title: "Реквизиты",
      text: text
    });
  }
}
