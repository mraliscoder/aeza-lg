import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { mediaQueries, Container, LanguageSwitcher } from "./UI";

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
  display: grid;
  grid-template-columns: 20% 60% 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mediaQueries.desktop} {
    padding: 7px 12px;
    border-bottom: 1px solid
      ${({ scrolled }) => (scrolled ? "#E1E1E1" : "transparent")};
  }
`;

const Logo = styled.img`
  height: 36px;
  width: auto;
`;

const Links = styled.div`
  display: none;
  margin-right: 48px;

  ${mediaQueries.desktop} {
    display: flex;
  }
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

const RightSection = styled.div`
  display: flex;
`;

export default function Header() {
  const { t } = useTranslation();
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
          <a href="https://aeza.net">
            <Logo src={logo} />
          </a>
          <RightSection>
            <Links>
              {t<any, any>("links", { returnObjects: true }).map(
                ({ title, url }: any) => (
                  <Link key={url} href={url} target="_blank">
                    {title}
                  </Link>
                )
              )}
            </Links>
            <LanguageSwitcher />
          </RightSection>
        </InnerContainer>
      </Container>
    </Wrapper>
  );
}
