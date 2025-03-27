import "./App.scss";
import React, { useRef, useEffect } from "react";
import Experience from "./Experience/Experience";
import Modal from "./components/Modal/Modal";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

function App() {
  return (
    <>
      <LoadingScreen />
      <Modal />
      <Experience />
    </>
  );
}

export default App;
