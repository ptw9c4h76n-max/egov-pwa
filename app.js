document.addEventListener("DOMContentLoaded", function() {

  const tabDoc = document.getElementById("tabDoc");
  const tabReq = document.getElementById("tabReq");
  const documentSection = document.getElementById("documentSection");
  const requisitesSection = document.getElementById("requisitesSection");

  if (tabDoc && tabReq) {
    tabDoc.addEventListener("click", function() {
      documentSection.classList.remove("hidden");
      requisitesSection.classList.add("hidden");
      tabDoc.classList.add("active");
      tabReq.classList.remove("active");
    });

    tabReq.addEventListener("click", function() {
      documentSection.classList.add("hidden");
      requisitesSection.classList.remove("hidden");
      tabReq.classList.add("active");
      tabDoc.classList.remove("active");
    });
  }

  const openBtn = document.querySelector(".primary-btn");

  if (openBtn) {
    openBtn.addEventListener("click", function() {
      openAccess();
    });
  }

});


function openAccess() {

  const face = document.getElementById("faceModal");
  if (!face) {
    showQR();
    return;
  }

  face.classList.remove("hidden");

  setTimeout(() => {
    face.classList.add("hidden");
    showQR();
  }, 1500);
}


function showQR() {

  const modal = document.getElementById("qrModal");
  if (!modal) return;

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
