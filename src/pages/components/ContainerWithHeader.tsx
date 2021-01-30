import React, { ElementType } from 'react';
import styled from 'styled-components';

interface ContainerWithHeaderProps {
  header: string,
  children: any,
  smallPadding?: boolean,
  lightBorder?: boolean,
  fitContent?: boolean,
  editable?: boolean,
  handleEdit?: () => void,
}

interface ContainerProps {
  smallPadding: boolean,
  lightBorder: boolean,
  fitContent: boolean,
}

const Container = styled.div<ContainerProps>`
  position: relative;
  width: ${(props) => (props.fitContent ? 'fit-content' : 'calc(100% - 20px)')};
  margin: 30px 10px 20px 10px;
  box-sizing: border-box;
  padding: ${(props) => (props.smallPadding ? '20px 10px 5px 10px' : '20px')};
  border-radius: 4px;
  border: 1px solid ${(props) => (props.lightBorder ? '#80808070' : 'grey')};
  background: white;
`;

interface HeaderProps {
  lightBorder: boolean
}

const Header = styled.div<HeaderProps>`
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

const EditButton = styled.button`
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

const ContainerWithHeader = (props: ContainerWithHeaderProps) => (
  <Container
    smallPadding={props.smallPadding || false}
    lightBorder={props.lightBorder || false}
    fitContent={props.fitContent || false}
  >
    <Header
      lightBorder={props.lightBorder || false}
    >
      {props.header}
    </Header>
    {props.editable && (
      <EditButton
        onClick={props.handleEdit}
      >
        Edit
      </EditButton>
    )}
    {props.children}
  </Container>
);

interface ContainerWithHeaderRowProps {
  header: string
  content: string | number
}

const Row = styled.div`
  span { 
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 700;
  }
`;

const ContainerWithHeaderRow = (props: ContainerWithHeaderRowProps) => (
  <Row>
    <span>{`${props.header}: `}</span> {props.content}
  </Row>
);

export {
  Row,
  ContainerWithHeader,
  ContainerWithHeaderRow,
};
