import * as S from "./styles";

const Footer = () => {
  return (
    <S.Container>
      <S.Copyright>© Yorkie 2022</S.Copyright>
      <S.About
        onClick={() => {
          window.open("https://github.com/yorkie-team/toonie");
        }}
      >
        Github
      </S.About>
    </S.Container>
  );
};

export default Footer;
