import styled from 'styled-components';

import { COLORS, SIZES } from './constants';

const TopBar = styled.div`
    display: flex;
    background: ${COLORS.backgrounds.topBar};
    height: ${SIZES.topBarHeight};
`;

export { TopBar };
