import React, { useEffect, Suspense } from "react";
import { createGlobalStyle } from "styled-components";
import { useTranslation } from "react-i18next";

import Header from "./components/Header";
import Hero from "./components/Hero";
import SpeedTest from "./components/SpeedTest";
import TestFiles from "./components/TestFiles";
import RunCommand from "./components/RunCommand";
import Footer from "./components/Footer";

import { Container, Row, Column } from "./components/UI";

import coverImage from "./images/cube.png";
import mobileCoverImage from "./images/cube.png";

const GlobalStyle = createGlobalStyle`
html {
  font-family: "Inter", sans-serif;
  font-size: 10px;
  -webkit-font-smoothing: antialiased;
}
`;

declare global {
  interface Window {
    initUI(): void;
    startStop(): void;
    s: {
      setSelectedServer(server: any): void;
      isTestPointsAdded(): boolean;
    };
    servers: {
      name: string;
      server: string;
    }[];
  }
}

const locations = ["msk", "de", "at"];

function App() {
  const [userIp, setIp] = React.useState("");
  const [selectedLocation, setLocation] = React.useState("msk");

  useEffect(() => {
    fetch(`https://${selectedLocation}.lg.aeza.net/info`)
      .then((res) => res.json())
      .then((res) => setIp(res.ip))
      .catch((e) => console.error(e));
  }, [selectedLocation]);

  useEffect(() => {
    if (window && window.servers !== undefined) {
      if (window.s.isTestPointsAdded()) {
        window.s.setSelectedServer(
          window.servers.find(({ name }) => name === selectedLocation)
        );
      }
    }
  }, [selectedLocation]);

  return (
    <Suspense fallback="loading">
      <GlobalStyle />
      <Header />
      <Hero
        userIp={userIp}
        image={coverImage}
        mobileImage={mobileCoverImage}
        locations={locations}
        selectedLocation={selectedLocation}
        setLocation={setLocation}
      />
      <Container>
        <SpeedTest />
        <Row>
          <Column desktopSize={6}>
            <RunCommand selectedLocation={selectedLocation} />
          </Column>
          <Column desktopSize={6}>
            <TestFiles selectedLocation={selectedLocation} />
          </Column>
        </Row>
      </Container>
      <Footer />
    </Suspense>
  );
}

export default App;
