import "./App.scss";
import React, { useRef, useEffect } from "react";
import Experience from "./Experience/Experience";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      <Experience />
      <Modal />
    </>
  );
}

export default App;
