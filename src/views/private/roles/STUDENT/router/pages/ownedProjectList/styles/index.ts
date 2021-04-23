import styled from 'styled-components';

export const ProjectsContainer = styled.div`
  padding: 50px 30px;
`;

export const ProjectWrapper = styled.div<{ borderColor: string}>`
  border: solid 8px ${(props) => props.borderColor};
  margin-bottom: 30px;
  padding: 8px;
  border-radius: 8px;
  background: white;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  
  button + button {
    margin: 5px 0;
  }
`;

export const HighlightedText = styled.span`
  font-family: 'Source Sans Pro',sans-serif;
  font-weight: 600;
  background-color: #cdcdcd85;
  padding: 1px 4px;
  margin: 0 2px;
  font-style: italic;
  border-radius: 4px;
`;

export const TagWrapper = styled.div`
  display: inline-block;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  background: yellow;
  width: fit-content;
  box-sizing: border-box;
  padding: 2px 5px;
  margin: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TableContainer = styled.div`
  background: white;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #373737;
  box-sizing: border-box;
  box-shadow: 0 0 2px 0 rgb(0 0 0 / 54%);
`;
