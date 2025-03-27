import React, { useEffect, useRef } from "react";
import "./Modal.scss";
import { useModalStore } from "../stores/useModalStore";
import { modalContent } from "../data/modalContent";

const Modal = () => {
  const { isModalOpen, modalID, closeModal } = useModalStore();
  const modalRef = useRef(null);

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
        <button className="modal-back-button" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
