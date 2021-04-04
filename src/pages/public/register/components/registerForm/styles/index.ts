import styled from 'styled-components';

export const FieldsRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

export const FieldWrapper = styled.div<{ fullWidth?: boolean }>`
  ${(props) => (props.fullWidth ? 'width: 100%;' : 'min-width: 50%;')}
  padding: 0 12px;
  box-sizing: border-box;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
`;
