import styled, { keyframes, css } from 'styled-components';

const StyledPhotoWrapper = styled.div`
  position: relative;
  width: 160px;
  height: 200px;
  overflow: hidden;
  margin: 30px 20px;
  border-radius: 8px;
  border: 1px solid grey;
  text-align: center;
  background: white;
  
  svg {
    font-size: 7.8rem;
  }
`;

const StyledPhotoForm = styled.form`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  input[type="file" i] {
    display: block;
    margin: 12px auto;
    width: 80%;
  }
`;

const StyledImagePreviewContainer = styled.div`
  width: 300px;
  height: 300px;
`;

const simpleRotateAnimationTo180 = keyframes`
 0% { transform: rotate(0deg)}
 100% { transform: rotate(180deg)} 
`;

const simpleRotateAnimationFrom180 = keyframes`
 0% { transform: rotate(180deg)}
 100% { transform: rotate(0deg)} 
`;

const animationStyles = css`
  animation: ${simpleRotateAnimationFrom180} 0.35s ease-in;
  animation-delay: 0.1s;
`;

const animationHoverStyles = css`
  animation: ${simpleRotateAnimationTo180} 0.35s ease-out;
  animation-delay: 0.1s;
`;

const StyledIconButton = styled.button<{animated?: boolean}>`
  position: absolute;
  border: none;
  outline: none;
  color: #ffc671;
  top: 3px;
  right: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 5px;
  transition: all 0.2s;
  width: 30px;
  height: 30px;
  ${(props) => (props.animated ? animationStyles : null)}
  
  svg {
    font-size: 20px;
  }
  
  &:hover {
    box-shadow: inset 0 0 2px #8080806b;
    color: #f8ba5d;
    cursor: pointer;
    ${(props) => (props.animated ? animationHoverStyles : null)}
  }
`;

export {
  StyledPhotoWrapper,
  StyledPhotoForm,
  StyledIconButton,
  StyledImagePreviewContainer,
};
