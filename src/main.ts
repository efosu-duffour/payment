import SplitType from 'split-type';
import './style.css'
import gsap from 'gsap';

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const mobileNavContainer = document.querySelector(".mobile-header-container") as HTMLDivElement;
  const menuButton = document.querySelector(".menu-button") as HTMLButtonElement;

  
 

  menuButton.addEventListener("click", () => {
    if (body.classList.contains("menu-active")) {
      body.classList.remove("menu-active");
      body.classList.add("menu-inactive");
      onMenuInactive();

      return;
    }

    if (body.classList.contains("menu-inactive")) {
      body.classList.remove("menu-inactive");
      body.classList.add("menu-active");
      onMenuActive();

      return;
    }
  
  })

  window.addEventListener("resize", () => {
    if (Math.floor(window.innerWidth) >= 750) {
      if (body.classList.contains("menu-active")) {
        body.classList.remove("menu-active");
        body.classList.add("menu-inactive");

        gsap.to(mobileNavContainer, {
          right: "-100%"
        });
        return;
      }
    }
  })

  function onMenuActive(): void {
    gsap.to(mobileNavContainer, {
      right: 0,
      onStart: () => {
        menuButton.disabled = true;
      },
      onComplete: () => {
        menuButton.disabled = false;
      }
    })
  }

  function onMenuInactive(): void {
    gsap.to(mobileNavContainer, {
      right: "-100%",
      onStart: () => {
        menuButton.disabled = true;
      },
      onComplete: () => {
        menuButton.disabled = false;
      }
    })
  }

  

})


window.addEventListener("load", () => {
  const splitTexts = new SplitType("h1", {
    types: "lines,words,chars",

  })

  setTimeout(() => {
    document.body.style.visibility = "visible"
    
    if (matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      animatePage();
    }
  }, 1000)



  function animatePage(): void {
    const tl = gsap.timeline();

    tl.addLabel("start", 0)
    .from(splitTexts.chars, {
      translateY: -100,
      stagger: {
        each: 0.06
      },
      duration: 0.4,
      onComplete: () => {
        splitTexts.revert();
      }
    }, "start")
    .from(".header-container", {
      translateY: -100
    }, "start+=0.5")
    .from(".mockup-container", {
      translateY: "100%",
      ease: "power1.out",
      duration: 1
    }, "start+=1.5")
  }
})