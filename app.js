let qrInterval;

function showDocument() {
  document.getElementById("documentSection").classList.remove("hidden");
  document.getElementById("requisitesSection").classList.add("hidden");
  document.getElementById("openBtn").classList.remove("hidden");
document.getElementById("shareBtn").classList.add("hidden");
}

function showRequisites() {
  document.getElementById("documentSection").classList.add("hidden");
  document.getElementById("requisitesSection").classList.remove("hidden");
  document.getElementById("openBtn").classList.add("hidden");
document.getElementById("shareBtn").classList.remove("hidden");
}



  modal.classList.remove("hidden");

  const code = Math.floor(100000 + Math.random() * 900000);
  shortCodeEl.innerText = code;

  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: code.toString(),
    width: 220,
    height: 220
  });

  let time = 60;

  qrInterval = setInterval(() => {
    time--;
    const seconds = time < 10 ? "0" + time : time;
    timerEl.innerText = "Срок действия: 00:" + seconds;

    if (time <= 0) {
      closeQR();
    }
  }, 1000);
}

function closeQR() {
  clearInterval(qrInterval);
  document.getElementById("qrModal").classList.add("hidden");
}

async function shareData() {
  const text = `ФИО: ТВОЁ ФИО`;

  if (navigator.share) {
    await navigator.share({
      title: "Реквизиты",
      text: text
    });
  }
}
