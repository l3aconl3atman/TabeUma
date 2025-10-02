"use strict";
// ****************************** VARIABLES ****************************** //
// Overlay
const overlay = document.querySelector(".overlay");

// Sections
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const heroSection = document.querySelector("#hero-section");
const aboutUsSection = document.querySelector("#about-us-section");

// Pop Up Gallery
const popUp = document.querySelectorAll(".pop-up");
const closePopUp = document.querySelectorAll(".close-pop-up");
const openPopUp = document.querySelectorAll(".open-pop-up");
const openGallery = document.querySelectorAll(".open-gallery");
const galleryOverlay = document.querySelectorAll(".gallery");
const hideGallery = document.querySelectorAll(".gallery-close-btn");

// Copy Function Variables
const copyBtn = document.querySelectorAll(".copy-btn");
const textToCopy = document.querySelectorAll(".text-to-copy");
const message = document.getElementById("message");
// Copy Function Variables
// ****************************** VARIABLES ****************************** //

// ****************************** LINE POP UP ****************************** //
const showPopUp = function (i) {
  popUp[i].classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.body.classList.add("disable-scroll");
};

const hidePopUp = function (i) {
  popUp[i].classList.add("hidden");
  overlay.classList.add("hidden");
  document.body.classList.remove("disable-scroll");
};

for (let i = 0; i < openPopUp.length; i++) {
  openPopUp[i].addEventListener("click", () => showPopUp(i));
  closePopUp[i].addEventListener("click", () => hidePopUp(i));
  overlay.addEventListener("click", () => hidePopUp(i));
}
// ****************************** LINE POP UP ****************************** //

// ****************************** GALLERY ****************************** //
const showGallery = function (i) {
  galleryOverlay[i].classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.body.classList.add("disable-scroll");
};

const closeGallery = function (i) {
  galleryOverlay[i].classList.add("hidden");
  overlay.classList.add("hidden");
  document.body.classList.remove("disable-scroll");
};

for (let i = 0; i < openGallery.length; i++) {
  openGallery[i].addEventListener("click", () => showGallery(i));
  hideGallery[i].addEventListener("click", () => closeGallery(i));
  overlay.addEventListener("click", () => closeGallery(i));
}
// ****************************** GALLERY ****************************** //

// Copy Function Event Listener
for (let i = 0; copyBtn.length > i; i++) {
  copyBtn[i].addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(textToCopy[i].textContent);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  });
}

// Audio (Temporary Off)
window.onload = function () {
  let audio = new Audio("../Audio/AYAM DIDIK - INSTRUMENTAL.mp3");
  audio.play();
  audio.loop = true;
  audio.volume = 0.1;
};

const imagesState = Array.from(document.querySelectorAll(".parallax-img")).map(
  (img) => ({
    el: img,
    speed: parseFloat(img.dataset.speed),
    y: 0,
  })
);

let latestScrollY = 0;
let ticking = false;

window.addEventListener("scroll", () => {
  latestScrollY = window.pageYOffset;
  if (!ticking) requestAnimationFrame(updateParallax);
  ticking = true;
});

function updateParallax() {
  imagesState.forEach((obj) => {
    const targetY = -latestScrollY * obj.speed;
    obj.y += (targetY - obj.y) * 0.1;
    obj.el.style.transform = `translate3d(0, ${obj.y}px, 0)`;
  });
  requestAnimationFrame(updateParallax);
}

const goToTopBtn = document.querySelector(".go-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 500) {
    goToTopBtn.classList.add("show");
  } else {
    goToTopBtn.classList.remove("show");
  }
});

// ****************************** STICKY NAVIGATION ****************************** //

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const heroObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: "-80px",
});

heroObserver.observe(heroSection);
// ****************************** STICKY NAVIGATION ****************************** //
