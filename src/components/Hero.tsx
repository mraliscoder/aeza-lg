import React from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";

import {
  mediaQueries,
  Title as BaseTitle,
  Description as BaseDescription,
  Container,
} from "./UI";

interface WrapperProps {
  image?: any;
  mobileImage?: any;
}

const Wrapper = styled.section<WrapperProps>`
  position: relative;
  margin-top: 8px;
  min-height: 632px;
  margin-bottom: 64px;
  padding: 32px 16px 12px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #000000;
  border-radius: 24px;
  justify-content: space-between;

  ${({ image, mobileImage }) =>
    image &&
    css`
      background-image: url(${mobileImage ? mobileImage : image});
      background-repeat: no-repeat;
      background-position: center 75%;
      background-size: 100% auto;

      ${mediaQueries.desktop} {
        background-image: url(${image});
        background-position: right center;
        background-size: auto 100%;
      }
    `}

  ${mediaQueries.desktop} {
    min-height: 400px;
    padding: 48px 32px 24px;
  }
`;

const Texts = styled.div`
  position: relative;
  z-index: 2;
`;

interface TitleProps {
  withGradient?: boolean;
}

const Title = styled(BaseTitle)<TitleProps>`
  color: #ffffff;
  word-wrap: break-word;
  hyphens: auto;

  ${mediaQueries.desktop} {
    max-width: 534px;
  }
`;

const Description = styled(BaseDescription)`
  color: #ffffff;

  ${mediaQueries.desktop} {
    max-width: 428px;
  }
`;

const Tabs = styled.div`
  margin-top: 40px;
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #ffffff;

  ${mediaQueries.desktop} {
    margin-top: 0;
  }
`;

interface TabProps {
  active: boolean;
}

const Tab = styled.button<TabProps>`
  margin: 0;
  flex-basis: 50%;
  padding: 18px 0;
  border: none;
  background: ${({ active }) => (active ? "#FFFFFF" : "transparent")};
  color: ${({ active }) => (active ? "#000000" : "#ffffff")};
  text-align: center;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;

  & + & {
    border-left: 1px solid #8f8f8f;
  }

  &:only-child {
    flex-basis: 100%;
  }
`;

interface HeroProps {
  userIp: string;
  image?: any;
  mobileImage?: any;
  selectedLocation: string;
  locations: string[];
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export default function Hero({
  userIp,
  image,
  mobileImage,
  locations,
  selectedLocation,
  setLocation,
}: HeroProps) {
  const { t } = useTranslation();
  const changeLocation = React.useCallback(
    (location: string) => {
      const button = document.getElementById("startStopBtn");

      if (button?.classList?.contains("running")) {
        alert(t("hero.error"));
        return;
      }

      setLocation(location);
    },
    [setLocation, t]
  );

  return (
    <Container>
      <Wrapper image={image} mobileImage={mobileImage}>
        <Texts>
          <Title>{t("hero.title")}</Title>
          <Description>
            {t("hero.description")}
            <br />
            <br />
            {t("hero.ip")}: {userIp.length === 0 ? "..." : userIp}
          </Description>
        </Texts>
        <Tabs>
          {locations.map((code) => (
            <Tab
              key={code}
              onClick={() => changeLocation(code)}
              active={selectedLocation === code}
            >
              {t(`locations.${code}`)}
            </Tab>
          ))}
        </Tabs>
      </Wrapper>
    </Container>
  );
}
