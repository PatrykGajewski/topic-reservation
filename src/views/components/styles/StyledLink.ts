import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkStyles = css`
    text-decoration: none;
    font-family: 'Source Sans Pro', sans-serif;
    display: block;
    text-align: center;
    padding: 8px 15px;
    background: #083b66;
    border: 2px solid #083b66;
    border-bottom: 2px solid white;
    color: white;
    font-size: 20px;
    font-weight: 700;
    transition: all 0.2s;
    
    &:hover {
        background: white;
        color: #083b66;
    }
`;
export const StyledLink = styled(Link)`
    ${LinkStyles}
`;
