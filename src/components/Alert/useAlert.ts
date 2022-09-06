import { useContext } from "react";
import { AlertContext } from "./AlertContext";

const useAlert = () => {
  const alertContext = useContext(AlertContext);
  return alertContext;
};

export default useAlert;
