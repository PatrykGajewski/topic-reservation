import styled, { css } from 'styled-components';

export const MainContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const headerStyles = css`
    font-family: 'Source Sans Pro', sans-serif;
    display: block;
`;

export const HeaderBig = styled.span`
    font-weight: 700;
    font-size: 64px;
    ${headerStyles}
`;

export const HeaderMedium = styled.span`
    font-weight: 400;
    font-size: 28px;
    ${headerStyles}
`;

export const HeaderSmall = styled.span`
    font-weight: 300;
    font-size: 24px;
    ${headerStyles};
`;

const sectionStyles = css`
    width: 100%;
    padding: 40px 0;
    text-align: center;
`;

export const DarkSection = styled.div`
    background-color: rgb(0, 15, 51);
    color: white;
    ${sectionStyles}
`;

export const LightSection = styled.div`
    background-color: white;
    color: rgb(0, 15, 51);
    ${sectionStyles}
`;

export const ScalableImg = styled.img`
    max-width: 100%;
    height: auto;
`;
export const IconWrapper = styled.div`
    svg {
        font-size: 64px;
    }
`;

export const StyledUl = styled.ul`
  text-align: left;
`;
