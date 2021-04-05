import styled from 'styled-components';
import {ContentWrapper} from '../../../../../../../components/styles';

export const ContentContainer = styled(ContentWrapper)`
  padding: 20px;
  
  & > button {
    position: fixed;
    right: 40px;
    bottom: 30px;
  }
`;

