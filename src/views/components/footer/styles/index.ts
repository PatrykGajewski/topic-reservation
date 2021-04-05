import styled from 'styled-components';

const FooterContainer = styled.div`
  height: 60px;
  width: 100%;
  background: rgb(8, 59, 102);
  display: flex;
  align-items: center;
  align-content: center;
`;

const FooterText = styled.p`
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  width: calc(100% - 150px);
  text-align: center;
`;

const IconsContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const IconLink = styled.a`
  display: block;

  & > svg {
    color: white;
    font-size: 2rem;
  }
`;

export {
  FooterContainer,
  FooterText,
  IconsContainer,
  IconLink,
};
