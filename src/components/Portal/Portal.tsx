import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface Props {
  children: React.ReactNode;
}

const Portal: React.FC<Props> = ({ children }) => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setElement(document.body);
  }, []);

  if (!element) {
    return null;
  }
  return ReactDOM.createPortal(children, element);
};

export default Portal;
