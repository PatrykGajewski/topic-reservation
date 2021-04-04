import styled from 'styled-components';
import { ContentWrapper } from '../../../../../../components/styles';

export const ContentContainer = styled(ContentWrapper)`
  padding: 20px;
  
  & > button {
    position: fixed;
    right: 40px;
    bottom: 30px;
  }
`;

export const EmptyStateContainer = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > p {
    font-size: 2rem;
    font-weight: 700;
  }

  & > div {
    margin-top: 40px;
    width: 120px;
    height: 120px;
    background: #d9b251;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > div > svg {
    width: 100%;
    display: block;
    font-size: 80px;
  }
`;
