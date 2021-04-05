import styled from 'styled-components';

interface ContainerProps {
  smallPadding: boolean,
  lightBorder: boolean,
  fitContent: boolean,
  noMargin: boolean,
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: ${(props) => (props.fitContent ? 'fit-content' : '100%')};
  ${(props) => (props.noMargin ? null : 'margin: 30px 10px 20px 10px;')}
  box-sizing: border-box;
  padding: ${(props) => (props.smallPadding ? '20px 10px 5px 10px' : '20px')};
  border-radius: 4px;
  border: 1px solid ${(props) => (props.lightBorder ? '#80808070' : 'grey')};
  background: white;
`;

interface HeaderProps {
  lightBorder: boolean
}

export const Header = styled.div<HeaderProps>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px 15px;
  max-height: 30px;
  border: 1px solid ${(props) => (props.lightBorder ? '#80808070' : 'grey')};
  background: white;
  border-radius: 8px;
`;
export const EditButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: #ffc671;
  width: 60px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border-radius: 0px 0px 0px 8px;
  cursor: pointer;
  transition: all .2s;
  border: none;
  outline: none;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  font-size: 14px;
  
  &:hover {
    background: #f8ba5d;
  }
`;
