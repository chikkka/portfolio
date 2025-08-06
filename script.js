// document.addEventListener("DOMContentLoaded", function () {
//   const logoImg = document.querySelector("#header-logo-img img");
//   const bearTalkImgs = document.querySelectorAll("#bear-talk img");

//   logoImg.addEventListener("mouseenter", function () {
// すべて非表示に
// bearTalkImgs.forEach((img) => (img.style.display = "none"));

// ランダムに1つ選んで表示
//   const randomIndex = Math.floor(Math.random() * bearTalkImgs.length);
//   bearTalkImgs[randomIndex].style.display = "block";
// });

// logoImg.addEventListener("mouseleave", function () {
// ホバー外れたら全部非表示に
//     bearTalkImgs.forEach((img) => (img.style.display = "none"));
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const logoImg = document.querySelector("#header-logo-img img");
  const bearTalk = document.getElementById("bear-talk");
  const bearTalkImgs = bearTalk.querySelectorAll("img");

  function showRandomBear() {
    // すべて非表示に
    bearTalkImgs.forEach((img) => (img.style.display = "none"));

    // ランダムに1つ選んで表示
    const randomIndex = Math.floor(Math.random() * bearTalkImgs.length);
    bearTalkImgs[randomIndex].style.display = "block";

    // 表示ON
    bearTalk.style.opacity = 1;
    bearTalk.style.pointerEvents = "auto";
  }

  function hideBears() {
    // すべて非表示に
    bearTalkImgs.forEach((img) => (img.style.display = "none"));

    // 非表示OFF
    bearTalk.style.opacity = 0;
    bearTalk.style.pointerEvents = "none";
  }

  // ホバー対応
  logoImg.addEventListener("mouseenter", showRandomBear);
  logoImg.addEventListener("mouseleave", hideBears);

  // クリック対応
  logoImg.addEventListener("click", showRandomBear);
});

// --------------------- blog ---------------------------------

// --------------------- service -------------------------------
// service-toggle.js
//htmlの読み込みが終わったタイミングでこの中のJavaScriptを実行してねという合図
//画像などは待たずHTMLだけ読み終えた時点でOK
document.addEventListener("DOMContentLoaded", function () {
  const servicePopup = document.getElementById("service-popup");

  const serviceHtml = document.getElementById("service-html");
  const serviceDaiko = document.getElementById("service-daiko");
  const serviceWp = document.getElementById("service-wp");
  const serviceDesign = document.getElementById("service-design");

  const mask = document.getElementById("mask");

  const servicePopupHtml = document.getElementById("service-popup__html");
  const servicePopupDaiko = document.getElementById("service-popup__daiko");
  const servicePopupWp = document.getElementById("service-popup__wp");
  const servicePopupDesign = document.getElementById("service-popup__design");

  const closeBtnHtml = document.querySelector(".close-btn__html");
  const closeBtnDaiko = document.querySelector(".close-btn__daiko");
  const closeBtnWp = document.querySelector(".close-btn__wp");
  const closeBtnDesign = document.querySelector(".close-btn__design");

  serviceHtml.addEventListener("click", function () {
    servicePopup.classList.remove("service-hidden");
    servicePopupHtml.classList.remove("service-html__hidden");
    mask.classList.remove("mask-hidden");
  });

  serviceDaiko.addEventListener("click", function () {
    servicePopup.classList.remove("service-hidden");
    servicePopupDaiko.classList.remove("service-daiko__hidden");
    mask.classList.remove("mask-hidden");
  });

  serviceWp.addEventListener("click", function () {
    servicePopup.classList.remove("service-hidden");
    servicePopupWp.classList.remove("service-wp__hidden");
    mask.classList.remove("mask-hidden");
  });

  serviceDesign.addEventListener("click", function () {
    servicePopup.classList.remove("service-hidden");
    servicePopupDesign.classList.remove("service-design__hidden");
    mask.classList.remove("mask-hidden");
  });

  closeBtnHtml.addEventListener("click", function () {
    servicePopup.classList.add("service-hidden");
    servicePopupHtml.classList.add("service-html__hidden");
    mask.classList.add("mask-hidden");
  });

  closeBtnDaiko.addEventListener("click", function () {
    servicePopup.classList.add("service-hidden");
    servicePopupDaiko.classList.add("service-daiko__hidden");
    mask.classList.add("mask-hidden");
  });

  closeBtnWp.addEventListener("click", function () {
    servicePopup.classList.add("service-hidden");
    servicePopupWp.classList.add("service-wp__hidden");
    mask.classList.add("mask-hidden");
  });

  closeBtnDesign.addEventListener("click", function () {
    servicePopup.classList.add("service-hidden");
    servicePopupDesign.classList.add("service-design__hidden");
    mask.classList.add("mask-hidden");
  });

  mask.addEventListener("click", function () {
    closeBtnHtml.click();
  });
});

// ハートの挙動
document.addEventListener("DOMContentLoaded", () => {
  const likeContainers = document.querySelectorAll(".like-container");

  likeContainers.forEach((container, index) => {
    const heart = container.querySelector(".heart");
    const count = container.querySelector(".count");

    // ローカルストレージキー
    const key = `like-count-${index}`;
    let likeCount = parseInt(localStorage.getItem(key)) || 0;

    updateCountDisplay();

    heart.addEventListener("click", () => {
      // クリック上限なし（ただし保存される）
      likeCount++;
      localStorage.setItem(key, likeCount);
      heart.classList.add("liked");
      updateCountDisplay();
      createHeartEffects(heart);
    });

    function updateCountDisplay() {
      if (likeCount >= 1000000) {
        count.textContent = (likeCount / 1000000).toFixed(1) + "m";
      } else if (likeCount >= 1000) {
        count.textContent = (likeCount / 1000).toFixed(1) + "k";
      } else {
        count.textContent = likeCount;
      }
    }

    function createHeartEffects(element) {
      for (let i = 0; i < 6; i++) {
        const eff = document.createElement("div");
        eff.className = "heart-effect";
        eff.style.left = "50%";
        eff.style.top = "50%";
        eff.style.setProperty("--x", `${Math.random() * 60 - 30}px`);
        eff.style.setProperty("--y", `${-Math.random() * 60 - 20}px`);
        container.appendChild(eff);
        setTimeout(() => eff.remove(), 800);
      }
    }
  });
});
