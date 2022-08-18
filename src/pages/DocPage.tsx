import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import "../App.css";

// type DocPageProps = {
//   docKey: string;
// };
const DocPage = () => {
  const params = useParams();
  const docKey = params.docKey;

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
