import styled, {css} from "styled-components";
import BackgroundURL from "../../../../../img/loginBg.jpg";
import {SIZES} from "../../../../components/constants";

const ContainerBase = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${BackgroundURL});
`;

const Container = styled.div`
  ${ContainerBase}
  height: calc(100% - 120px);
`;

const ContentContainer = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  max-height: 100%;
  height: calc(100% - ${SIZES.topBarHeight});
  ${ContainerBase}
`;

const FormContainer = css`
   background: #fffffff0;
   padding: 25px;
   border-radius: 8px;
   box-sizing: border-box;
`;

const LoginFormContainer = styled.div`
   width: 30%;
   height: fit-content;
   
   ${FormContainer} 
`;

const RegisterFormContainer = styled.div`
  width: 50%;
  height: fit-content;
  margin: 10% auto;
  ${FormContainer}
`;

const ErrorWrapper = styled.div`
  background: yellow;
  padding: 1px;
  border-radius: 4px;
  margin: 10px;
`;

export {
  Container,
  ContentContainer,
  LoginFormContainer,
  RegisterFormContainer,
  ErrorWrapper,
}
