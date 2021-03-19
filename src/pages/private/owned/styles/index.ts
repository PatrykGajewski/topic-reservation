import styled from "styled-components";

export const ProjectsContainer = styled.div`
  margin: 50px 30px;
`;

export const ProjectWrapper = styled.div<{ bgColor: string}>`
  background-color: ${(props) => props.bgColor};
  margin-bottom: 30px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TagWrapper = styled.div`
  display: inline-block;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  background: yellow;
  width: fit-content
  box-sizing: border-box;
  padding: 2px 5px;
  margin: 5px;
`;
export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

