import styled from 'styled-components';


const StyledPromotersList = styled.div`
  background: #8da7ee;
  width: 100%;
  border-radius: 4px;
`;

const StyledListHeader = styled.div`
  display: flex;
  background: #0b3b66;
  color: white;
  justify-content: center;
  align-items: center;
  height: 50px;
  text-align: center;
  font-weight: bold;
  
  & > div {
    height: 100%;
    line-height: 50px;
    width: calc(100% / 7);
    border-right: 1px solid white;
  }
  
  & > div:last-child {
    border-right: 1px solid #0b3b66;
  }
`;

const StyledPromoterItem = styled.div`
  height: 50px;
  &:hover {
    box-shadow: inset 0 0 4px 0 grey;
    cursor: pointer;
  }
`;

export {
  StyledListHeader,
  StyledPromotersList,
  StyledPromoterItem,
}
