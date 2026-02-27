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

function openAccess() {

  const face = document.getElementById("faceModal");
  face.classList.remove("hidden");

  setTimeout(() => {
    face.classList.add("hidden");
    showQR();
  }, 1800);
}

function showQR() {

  const modal = document.getElementById("qrModal");
  modal.classList.remove("hidden");

  const randomCode = Math.floor(100000 + Math.random() * 900000);
  document.getElementById("shortCode").innerText = randomCode;

  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: randomCode.toString(),
    width: 220,
    height: 220
  });

  let time = 60;
  const timerEl = document.getElementById("timer");

  timerEl.innerText = "Срок действия: 01:00";

  const interval = setInterval(() => {
    time--;
    let seconds = time < 10 ? "0" + time : time;
    timerEl.innerText = "Срок действия: 00:" + seconds;

    if (time <= 0) {
      clearInterval(interval);
      modal.classList.add("hidden");
    }
  }, 1000);
}
}

async function shareData() {
  const text = `
ФИО: Зәрубаев Серікболсын Асхатұлы
ИИН: 031103551653
Дата рождения: 03.11.2003
`;

  if (navigator.share) {
    await navigator.share({
      title: "Реквизиты",
      text: text
    });
  }
}
