import React from "react";
import styled from "styled-components";

import { mediaQueries, Container } from "./UI";

import logo from "../images/logo.svg";

interface ScrolledBlock {
  scrolled: boolean;
}

const Wrapper = styled.div<ScrolledBlock>`
  margin-top: 8px;
  position: sticky;
  background: #ffffff;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-bottom: 1px solid
    ${({ scrolled }) => (scrolled ? "#E1E1E1" : "transparent")};

  ${mediaQueries.desktop} {
    margin-top: 16px;
    border-bottom: 0;
  }
`;

const InnerContainer = styled.div<ScrolledBlock>`
  padding: 4px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaQueries.desktop} {
    padding: 7px 12px;
    flex-direction: row;
    border-bottom: 1px solid
      ${({ scrolled }) => (scrolled ? "#E1E1E1" : "transparent")};
  }
`;

const Logo = styled.img`
  height: 36px;
  width: auto;
`;

const Links = styled.div`
  display: flex;
`;

const Link = styled.a`
  display: none;
  visibility: hidden;
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

  & + & {
    margin-left: 20px;
  }

  &:first-child {
    display: block;
    visibility: visible;
  }

  ${mediaQueries.desktop} {
    display: block;
    visibility: visible;
  }
`;

export default function Header() {
  const [isScrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 20) {
        setScrolled(true);
      } else if (window.pageYOffset <= 20) {
        setScrolled(false);
      }
    }

    if (typeof window !== undefined)
      window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Wrapper scrolled={isScrolled}>
      <Container>
        <InnerContainer scrolled={isScrolled}>
          <Logo src={logo} />
          <Links>
            <Link href="https://aeza.net" target="_blank">
              сайт
            </Link>
            <Link href="https://my.aeza.net" target="_blank">
              биллинг
            </Link>
            <Link href="https://t.me/aezahost" target="_blank">
              телеграм
            </Link>
            <Link href="https://vk.com/aezahost" target="_blank">
              вконтакте
            </Link>
          </Links>
        </InnerContainer>
      </Container>
    </Wrapper>
  );
}
