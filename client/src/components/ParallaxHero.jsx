import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ParallaxHero.css";

gsap.registerPlugin(ScrollTrigger);

const ParallaxHero = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        "--scrollTop",
        `${window.scrollY}px`
      );
    };

    window.addEventListener("scroll", handleScroll);

    // GSAP ScrollSmoother setup
    if (wrapperRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="wrapper" ref={wrapperRef}>
      <div className="content" ref={contentRef}>
        <header className="main-header">
          <div className="layers">
            <div className="layer__header">
              <div className="layers__caption">Welcome to</div>
              <div className="layers__title">The Overthrow</div>
            </div>
            <div
              className="layer layers__base"
              style={{ backgroundImage: "url(/img/layer-base.png)" }}
            ></div>
            <div
              className="layer layers__middle"
              style={{ backgroundImage: "url(/img/layer-middle.png)" }}
            ></div>
            <div
              className="layer layers__front"
              style={{ backgroundImage: "url(/img/layer-front.png)" }}
            ></div>
          </div>
        </header>

        <article
          className="main-article"
          style={{ backgroundImage: "url(/img/dungeon.jpg)" }}
        >
          <div className="main-article__content">
            <h2 className="main-article__header">
              Добро пожаловать в мир The Overthrow
            </h2>
            <p className="main-article__paragraph">
              Погрузитесь в захватывающий мир фэнтези, где вас ждут невероятные
              приключения, эпические битвы и загадочные тайны. Присоединяйтесь к
              сообществу игроков и станьте частью легенды.
            </p>
          </div>
          <div className="copy">© Elbrus Bootcamp Game Studio</div>
        </article>
      </div>
    </div>
  );
};

export default ParallaxHero;
