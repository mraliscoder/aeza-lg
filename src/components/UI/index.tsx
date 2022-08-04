import styled from "styled-components";
import { css } from "styled-components";

export const mediaQueries = {
  phone: "@media screen and (min-width: 360px)",
  desktop: "@media screen and (min-width: 1024px)",
  mediumDesktop: "@media screen and (min-width: 1440px)",
  largeDesktop: "@media screen and (min-width: 1920px)",
};

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 12px;
  max-width: 450px;
  box-sizing: border-box;

  ${mediaQueries.desktop} {
    max-width: 1440px;
    padding: 0 18px;
  }
`;

export const Row = styled.div`
  margin: 0 -6px;
  display: flex;
  flex-wrap: wrap;
`;

interface ColumnProps {
  mobileSize?: number;
  mobileOffset?: number;
  desktopSize: number;
  desktopOffset?: number;
  xlSize?: number;
  xlOffset?: number;
}

export const Column = styled.div<ColumnProps>`
  box-sizing: border-box;
  flex: 0 0 auto;
  padding: 0 6px;

  ${({ mobileOffset }) =>
    mobileOffset && `margin-left: ${(100 * mobileOffset) / 4}%;`}
  flex-basis: ${({ mobileSize = 4 }) => (100 * mobileSize) / 4}%;
  max-width: ${({ mobileSize = 4 }) => (100 * mobileSize) / 4}%;

  ${mediaQueries.desktop} {
    ${({ desktopOffset }) =>
      desktopOffset && `margin-left: ${(100 * desktopOffset) / 12}%;`}
    flex-basis: ${({ desktopSize }) => (100 * desktopSize) / 12}%;
    max-width: ${({ desktopSize }) => (100 * desktopSize) / 12}%;
  }

  ${mediaQueries.largeDesktop} {
    ${({ xlOffset }) =>
      xlOffset !== undefined && `margin-left: ${(100 * xlOffset) / 12}%;`}
    ${({ xlSize }) =>
      xlSize !== undefined &&
      css`
        flex-basis: ${(100 * xlSize) / 12}%;
        max-width: ${(100 * xlSize) / 12}%;
      `}
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 50px;
  line-height: 52px;
  letter-spacing: -0.01em;

  ${mediaQueries.desktop} {
    font-size: 7rem;
    line-height: 7rem;
    letter-spacing: -0.02em;
  }

  ${mediaQueries.largeDesktop} {
    font-size: 50px;
    line-height: 52px;
    letter-spacing: -0.01em;
  }
`;

export const Description = styled.p`
  margin: 20px 0 0;
  font-size: 16px;
  line-height: 20px;

  ${mediaQueries.desktop} {
    margin-top: 24px;
  }

  ${mediaQueries.largeDesktop} {
    margin-top: 16px;
  }
`;

export const Label = styled.label`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #8e8e8e;
`;

export const Input = styled.input`
  margin-top: 8px;
  display: block;
  padding: 16px 12px;
  // min-width: 450px;
  box-sizing: border-box;
  background: #f4f4f4;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  line-height: 20px;

  color: #000000;
`;

interface ButtonProps {
  disabled?: boolean;
}

export const Button = styled.a<ButtonProps>`
  display: inline-block;
  margin: 0;
  padding: 16px;
  box-sizing: border-box;
  background: #000000;
  border-radius: 12px;
  text-decoration: none;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  border: none;
  transition: all 150ms cubic-bezier(0.65, 0, 0.35, 1);

  &:hover {
    cursor: pointer;
    background: #303030;
  }

  &:active {
    background: #8e8e8e;
  }

  &:disabled {
    background: #e1e1e1;
    color: #8e8e8e;
  }
`;

export const Link = styled.a`
  margin: 0;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  text-decoration: none;
  transition: color 150ms cubic-bezier(0.65, 0, 0.35, 1);

  &:hover {
    text-decoration: underline;
    text-decoration-color: rgba(24, 201, 225, 0.3);
    cursor: pointer;
    color: #18c9e1;
  }

  &:active {
    text-decoration-color: #18c9e1;
  }
`;

export const GreyLink = styled(Link)`
  color: #8e8e8e;
`;
