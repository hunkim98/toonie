import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";

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
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <Editor docKey={docKey} />
      <Footer />
    </div>
  );
};

export default DocPage;
