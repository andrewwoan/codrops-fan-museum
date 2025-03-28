import "./App.scss";
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
