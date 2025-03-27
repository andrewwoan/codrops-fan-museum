import React, { useEffect, useRef } from "react";
import "./Modal.scss";
import { useModalStore } from "../../stores/useModalStore";
import { modalContent } from "../../data/modalContent";
import { playSound } from "../../utils/audioSystem.js";

const Modal = () => {
  const { isModalOpen, modalID, closeModal } = useModalStore();
  const modalRef = useRef(null);

  const handleClose = () => {
    playSound("thumpHover");
    closeModal();
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.cursor = "auto";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  if (!isModalOpen || !modalContent[modalID]) return null;

  const { title, link, linkText, paragraphs } = modalContent[modalID];

  return (
    <div className="modal-overlay">
      <div className="modal-container" ref={modalRef}>
        <button className="modal-back-button" onClick={handleClose}>
          <svg
            width="20"
            height="20"
            class=""
            viewBox="0 0 130 134"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M128.986 128.986L1 1" stroke="currentColor" />
            <path d="M128.986 128.986L1 1" stroke="currentColor" />
            <path d="M1 132.986L128.986 5" stroke="currentColor" />
          </svg>
        </button>

        <div className="modal-content">
          <h2 className="modal-title">{title}</h2>

          <div className="modal-paragraphs">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-link"
          >
            {linkText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
