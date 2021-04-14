import styled from 'styled-components';

export const EmptyStateContainer = styled.div`
  width: 100%;
  height: 100%;
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
