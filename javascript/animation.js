import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin);

// gsap.registerPlugin(SplitText);

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// gsap.from(".main-title", { duration: 3, y: 150, opacity: 0 });
// gsap.from(".main-container", { duration: 3, x: 1000, opacity: 0 });

/**
 * For main.html
 */
// window.addEventListener("scroll", (event) => {
//   gsap.to(".header", { duration: 1, y: -88 });
// });

let titleArray = [
  "Let's Explore the Land of Malaysia!",
  "一起來探討馬來西亞！",
  "Marilah kita jelajahi tanah Malaysia!",
];

const mainTitle = document.querySelector(".main-title");

gsap.from(".main-container", { duration: 3, y: 0, opacity: 0 });

gsap.from(".member-title", {
  scrollTrigger: {
    trigger: ".member-title",
    start: "top bottom",
    markers: true,
  },
  y: 200,
  duration: 0.3,
  opacity: 0,
});

gsap.from(".card1, .card2, .card3", {
  scrollTrigger: {
    trigger: ".card1",
    start: "top bottom",
    // markers: true,
  },
  y: 300,
  duration: 0.3,
  opacity: 0,
});

gsap.from(".about-us-title", {
  scrollTrigger: {
    trigger: ".about-us-title",
    start: "top bottom",
    markers: true,
  },
  y: 200,
  duration: 0.3,
  opacity: 0,
});

gsap.from(".about-us-vision", {
  scrollTrigger: {
    trigger: ".about-us-vision",
    start: "top bottom",
    markers: true,
  },
  y: 200,
  duration: 0.3,
  opacity: 0,
});

gsap.from(".merch-title", {
  scrollTrigger: {
    trigger: ".merch-title",
    start: "top bottom",
    markers: true,
  },
  y: 200,
  duration: 0.3,
  opacity: 0,
});

gsap.to(".footer", {
  scrollTrigger: ".footer",
  duration: 3,
});

// Text //
gsap.to("#main-title", {
  duration: 3,
  text: "一起來探索馬來西亞！",
  delay: 12,
  repeat: -1,
  yoyo: true,
  repeatDelay: 18,
});

gsap.to(".about-us-title", {
  duration: 2,
  text: "關於我們",
  delay: 5,
  repeat: -1,
  yoyo: true,
  repeatDelay: 18,
});

gsap.to(".member-title", {
  duration: 2,
  text: "組員介紹",
  delay: 5,
  repeat: -1,
  yoyo: true,
  repeatDelay: 18,
});

gsap.to(".merch-title", {
  duration: 2,
  text: "周邊商品",
  delay: 5,
  repeat: -1,
  yoyo: true,
  repeatDelay: 18,
});
