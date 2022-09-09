import React, { SetStateAction } from "react";
import { IoCloseOutline } from "react-icons/io5";
import * as S from "./styles";

interface Props {
  children: React.ReactNode;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ children, setIsModalOpen }) => {
  return (
    <S.ModalBackground>
      <S.ModalContainer>
        <IoCloseOutline
          style={{ cursor: "pointer", alignSelf: "flex-end" }}
          color="grey"
          size={35}
          onClick={() => {
            setIsModalOpen(false);
          }}
        />
        {children}
      </S.ModalContainer>
    </S.ModalBackground>
  );
};

export default Modal;
