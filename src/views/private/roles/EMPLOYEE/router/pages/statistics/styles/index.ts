import styled from "styled-components";

const StyledWidgetContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px 2px #c1c1c1;
  padding: 8px 12px;
  height: 500px;
  
  & > span {
    height: 2rem;
    display: block;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
  }
  
  & > div {
    height: calc(500px - 2rem) !important;
  }
`;

export {
  StyledWidgetContainer
}
