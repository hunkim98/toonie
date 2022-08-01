import React from "react";

import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";

type DocPageProps = {
  docKey: string;
};
const DocPage = () => {
  const params = useParams();
  const docKey = params.docKey;

  if (!docKey) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <Editor docKey={docKey} />
    </div>
  );
};

export default DocPage;
