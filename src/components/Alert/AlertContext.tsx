import {
  createContext,
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import * as S from "./styles";

export enum AlertType {
  NOTIFICATION = "NOTIFICATION",
  LOADING = "LOADING",
}
export interface AlertButtonProps {
  label: string;
  onClick: Function;
  style?: CSSProperties;
}

export interface AlertProps {
  message: string;
  description?: string;
  buttons?: AlertButtonProps[];
  type?: AlertType;
}

interface AlertContextProps {
  open: (data: AlertProps) => void;
  close: () => void;
}

const AlertContext = createContext<AlertContextProps>({} as AlertContextProps);

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const AlertContextProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<AlertProps>();
  const open = ({ message, buttons, description, type }: AlertProps) => {
    setModal({
      message,
      buttons,
      description,
      type: !type ? AlertType.NOTIFICATION : type,
    });
  };

  const close = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    //open modal when open is called (open sets the message and buttons)

    if (modal) {
      setIsOpen(true);
    }
  }, [modal]);

  const [rootBody, setRootBody] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootBody(document.body);
  }, []);

  return (
    <AlertContext.Provider
      value={{
        open,
        close,
      }}
    >
      {rootBody &&
        isOpen &&
        modal &&
        createPortal(
          <S.AlertBackground>
            <S.AlertContainer>
              <IoCloseOutline
                style={{ cursor: "pointer", alignSelf: "flex-end" }}
                color="#D9D9D9"
                size={40}
                onClick={() => {
                  setIsOpen(false);
                }}
              />

              <S.AlertMessage>{modal.message}</S.AlertMessage>
              {modal.type === AlertType.NOTIFICATION ? (
                <S.AlertButtonsContainer>
                  {modal.buttons ? (
                    modal.buttons.map((element) => {
                      return (
                        <S.AlertButton
                          key={element.label}
                          onClick={() => element.onClick()}
                          style={
                            element.style
                              ? element.style
                              : { backgroundColor: "#DCDCDC" }
                          }
                        >
                          {element.label}
                        </S.AlertButton>
                      );
                    })
                  ) : (
                    <S.AlertButton
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      style={{ backgroundColor: "#DCDCDC" }}
                    >
                      Yes
                    </S.AlertButton>
                  )}
                </S.AlertButtonsContainer>
              ) : (
                <div
                  style={{
                    alignSelf: "center",
                    paddingBottom: 20,
                  }}
                >
                  <div className="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}
              {modal.type === AlertType.NOTIFICATION && (
                <S.AlertDescription>{modal.description}</S.AlertDescription>
              )}
            </S.AlertContainer>
          </S.AlertBackground>,
          rootBody
        )}
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContextProvider, AlertContext };
