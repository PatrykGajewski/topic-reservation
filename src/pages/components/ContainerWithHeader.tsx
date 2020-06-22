import React, { ElementType } from 'react';
import styled from "styled-components";

interface ContainerWithHeaderProps {
  header: string,
  children: any,
}

const Container = styled.div`
  position: relative;
  width: calc(100% - 20px);
  margin: 30px 10px 20px 10px;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid grey;
  background: white;
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px 15px;
  max-height: 30px;
  border: 1px solid grey;
  background: white;
  border-radius: 8px;
  
`;

const ContainerWithHeader = (props: ContainerWithHeaderProps) => (
  <Container>
    <Header>
      {props.header}
    </Header>
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
  ContainerWithHeader,
  ContainerWithHeaderRow,
};
