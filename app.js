function showDocument() {
  document.getElementById("documentSection").classList.remove("hidden");
  document.getElementById("requisitesSection").classList.add("hidden");
}

function showRequisites() {
  document.getElementById("documentSection").classList.add("hidden");
  document.getElementById("requisitesSection").classList.remove("hidden");
}

function openAccess() {
  const qrSection = document.getElementById("qrSection");
  const timerEl = document.getElementById("timer");
  const shortCodeEl = document.getElementById("shortCode");

  qrSection.classList.remove("hidden");

  const randomCode = Math.floor(100000 + Math.random() * 900000);
  shortCodeEl.innerText = randomCode;

  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: randomCode.toString(),
    width: 200,
    height: 200
  });

  let time = 60;
  timerEl.innerText = "Срок действия: 01:00";

  const interval = setInterval(() => {
    time--;
    let seconds = time < 10 ? "0" + time : time;
    timerEl.innerText = "Срок действия: 00:" + seconds;

    if (time <= 0) {
      clearInterval(interval);
      qrSection.classList.add("hidden");
    }
  }, 1000);
}

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
  } else {
    alert("Функция не поддерживается");
  }
}
