import React, { useRef, useEffect } from "react";
import "./Page.scss";
import { useNavigate } from "react-router";
import { useToggleRoomStore } from "../stores/toggleRoomStore";
import { usePageTransitionStore } from "../stores/pageTransitionStore";
import gsap from "gsap";

const Page = ({ requireDarkRoom, panelContent, imageSrc }) => {
  const { isDarkRoom, setDarkRoom } = useToggleRoomStore();
  const { isEntering, delay } = usePageTransitionStore();

  let navigate = useNavigate();
  const innerWrapperRef = useRef(null);
  const headerRef = useRef(null);
  const quoteRef = useRef(null);
  const contentRefs = useRef([]);

  const scrollValues = useRef({
    target: 0,
    current: 0,
    ease: 0.1,
  });

  useEffect(() => {
    if (requireDarkRoom !== isDarkRoom) {
      setDarkRoom(requireDarkRoom);
    }
  }, [isDarkRoom]);

  useEffect(() => {
    if (isEntering) {
      gsap.set([headerRef.current, quoteRef.current, ...contentRefs.current], {
        opacity: 0,
        y: 20,
      });

      const newDelay = delay >= 2 ? delay : 0.3;
      const tl = gsap.timeline({ delay: newDelay });

      tl.to(
        headerRef.current,
        {
          duration: 1,
          opacity: 1,
          y: 0,
          ease: "power1.out",
        },
        0
      ).to(
        quoteRef.current,
        {
          duration: 1,
          opacity: 1,
          y: 0,
          ease: "power1.out",
        },
        0.2
      );

      contentRefs.current.forEach((ref, index) => {
        tl.to(
          ref,
          {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "power1.out",
          },
          0.4 + index * 0.15
        );
      });
    }
  }, [isEntering]);

  useEffect(() => {
    const scrollContainer = innerWrapperRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      e.preventDefault();
      scrollValues.current.target += e.deltaY;

      const maxScroll =
        scrollContainer.scrollHeight - scrollContainer.clientHeight;
      scrollValues.current.target = Math.max(
        0,
        Math.min(scrollValues.current.target, maxScroll)
      );
    };

    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;

      scrollValues.current.target += diff * 1.5;
      touchStartY = touchY;

      const maxScroll =
        scrollContainer.scrollHeight - scrollContainer.clientHeight;
      scrollValues.current.target = Math.max(
        0,
        Math.min(scrollValues.current.target, maxScroll)
      );
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    scrollContainer.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    scrollContainer.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    const smoothScroll = () => {
      scrollValues.current.current =
        scrollValues.current.current * (1 - scrollValues.current.ease) +
        scrollValues.current.target * scrollValues.current.ease;

      // Apply the scroll
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollValues.current.current;
      }

      requestAnimationFrame(smoothScroll);
    };

    const animationId = requestAnimationFrame(smoothScroll);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("wheel", handleWheel);
      scrollContainer.removeEventListener("touchstart", handleTouchStart);
      scrollContainer.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const panelClassNames = `side-panel${!isDarkRoom ? " light" : ""}`;
  const closeButtonClassNames = `side-panel-close-button${
    !isDarkRoom ? " light" : ""
  }`;

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className={panelClassNames}>
        <button onClick={handleClick} className={closeButtonClassNames}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.28906 0.875C1.77803 1.30566 1.30522 1.77763 0.873047 2.28711L8.58594 10L0.873047 17.7129C1.30522 18.2224 1.77803 18.6943 2.28906 19.125L10 11.4141L17.7109 19.125C18.222 18.6943 18.6948 18.2224 19.127 17.7129L11.4141 10L19.127 2.28711C18.6948 1.77763 18.222 1.30566 17.7109 0.875L10 8.58594L2.28906 0.875Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <div className="side-panel-wrapper">
          <div className="side-panel-inner-wrapper" ref={innerWrapperRef}>
            <div className="side-panel-image-wrapper">
              <img src={imageSrc} className="side-panel-image" />
            </div>
            <div className="side-panel-content-wrapper">
              {panelContent && (
                <>
                  <h1 className="panel-header" ref={headerRef}>
                    {panelContent.title}
                  </h1>
                  <h3 className="panel-quote" ref={quoteRef}>
                    {panelContent.quote}
                  </h3>
                  {panelContent.content.map((text, index) => (
                    <p
                      key={index}
                      className="panel-content-text"
                      ref={(el) => (contentRefs.current[index] = el)}
                    >
                      {text}
                    </p>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
