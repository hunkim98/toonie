import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import "../App.css";
import { useEffect, useRef } from "react";

// type DocPageProps = {
//   docKey: string;
// };
const DocPage = () => {
  const params = useParams();
  const docKey = params.docKey;
  // const fullScreenRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const fillScreenMethod = () => {
  //     let vh = window.innerHeight * 0.01;
  //     fullScreenRef.current?.style.setProperty("--vh", `${vh}px`);
  //   };
  //   window.addEventListener("resize", fillScreenMethod);
  //   return () => {
  //     window.removeEventListener("resize", fillScreenMethod);
  //   };
  // }, []);
  if (!docKey) {
    return null;
  }
  return (
    <div className="fillScreen">
      <Navbar />
      <Editor docKey={docKey} />
      <Footer />
    </div>
  );
};

export default DocPage;
