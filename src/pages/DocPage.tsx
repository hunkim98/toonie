import React from "react";

import { useParams } from "react-router-dom";
import Editor from "../components/Editor";

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
      <Editor docKey={docKey} />
    </div>
  );
};

export default DocPage;
