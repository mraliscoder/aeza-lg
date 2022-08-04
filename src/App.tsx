import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";

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

const locations = [
  {
    code: "msk",
    name: "Россия (ММТС-9)",
  },
  {
    code: "de",
    name: "Германия (Combahton)",
  },
  {
    code: "at",
    name: "Австрия (Interxion)",
  },
];

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

function App() {
  const [userIp, setIp] = React.useState("");
  const [selectedLocation, setLocation] = React.useState(0);

  useEffect(() => {
    fetch(`https://${locations[selectedLocation].code}.lg.aeza.net/info`)
      .then((res) => res.json())
      .then((res) => setIp(res.ip))
      .catch((e) => console.error(e));
  }, [selectedLocation]);

  useEffect(() => {
    if (window && window.servers !== undefined) {
      if (window.s.isTestPointsAdded()) {
        window.s.setSelectedServer(
          window.servers.find(
            ({ name }) => name === locations[selectedLocation].code
          )
        );
      }
    }
  }, [selectedLocation]);

  return (
    <>
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
            <RunCommand selectedLocation={locations[selectedLocation]} />
          </Column>
          <Column desktopSize={6}>
            <TestFiles selectedLocation={locations[selectedLocation]} />
          </Column>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default App;
