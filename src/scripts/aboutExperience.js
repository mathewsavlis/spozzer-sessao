import { gsap } from "../lib/gsap.js";

const REDUCED_MOTION_QUERY =
  "(prefers-reduced-motion: reduce)";

export function initAboutExperience() {
  const stage = document.querySelector(
    "[data-about-stage]"
  );

  if (
    !(stage instanceof HTMLElement) ||
    window.matchMedia(REDUCED_MOTION_QUERY).matches
  ) {
    return () => {};
  }

  const image = stage.querySelector(
    "[data-about-image]"
  );

  const items = [
    ...stage.querySelectorAll(
      "[data-about-item]"
    ),
  ];

  const secondaryPhoto = stage.querySelector(
    '[data-about-photo="secondary"]'
  );

  if (
    !(image instanceof HTMLElement) ||
    !(secondaryPhoto instanceof HTMLElement) ||
    items.length === 0
  ) {
    return () => {};
  }

  const context = gsap.context(() => {
    gsap.set(image, {
      autoAlpha: 0,
    });

    gsap.set(items, {
      autoAlpha: 0,
      y: 24,
      clipPath: "inset(0% 0% 100% 0%)",
      willChange: "transform, opacity, clip-path",
    });

    gsap.set(secondaryPhoto, {
      autoAlpha: 0,
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: "top 88%",
        end: "bottom 32%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(image, {
        autoAlpha: 1,
        duration: 1.2,
      })
      .to(
        items,
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.15,
          stagger: 0.22,
          ease: "power3.out",
        },
        "-=0.55"
      )
      .to(
        secondaryPhoto,
        {
          autoAlpha: 1,
          duration: 1.5,
          ease: "power1.inOut",
        },
        ">-0.1"
      )
      .set(items, {
        willChange: "auto",
      });
  }, stage);

  return () => {
    context.revert();
  };
}
