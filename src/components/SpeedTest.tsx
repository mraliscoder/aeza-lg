import React from "react";
import styled from "styled-components";

import { mediaQueries, Button as BaseButton } from "./UI";

const Wrapper = styled.div`
  padding: 40px 24px;
  margin-bottom: 48px;
  background: rgb(244, 244, 244);
  border-radius: 24px;
`;

const Title = styled.h2`
  margin: 0px 0px 28px;
  font-size: 24px;
  line-height: 28px;

  ${mediaQueries.desktop} {
    margin-bottom: 48px;
    font-size: 36px;
    line-height: 40px;
  }
`;

const Button = styled(BaseButton)`
  &.running {
    background-color: #18c9e1;
  }
`;

const Meters = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const InfoMeter = styled.div`
  position: relative;
  padding: 0 30px;
  display: flex;
  width: 20em;
  height: 20em;
  flex-direction: column;
  text-align: center;
`;

const MeterName = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
`;

const MeterValue = styled.p`
  position: absolute;
  left: 0;
  bottom: 2em;
  width: 100%;
  margin: 10px 0 0;
  font-size: 28px;
  line-height: 32px;
`;

const Unit = styled.p`
  position: absolute;
  left: 0;
  bottom: 2.3em;
  width: 100%;
  margin: 5px 0 0;
  font-size: 16px;
  line-height: 20px;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: center;
`;

export default function SpeedTest() {
  React.useEffect(() => {
    window.initUI();
  }, []);

  return (
    <Wrapper>
      <Title>проверка скорости</Title>
      <Meters>
        <InfoMeter>
          <MeterName>Скачивание</MeterName>
          <Canvas id="dlMeter" />
          <MeterValue id="dlText">0.00</MeterValue>
          <Unit>Мбит/с</Unit>
        </InfoMeter>
        <InfoMeter>
          <MeterName>Загрузка</MeterName>
          <Canvas id="ulMeter" />
          <MeterValue id="ulText">0.00</MeterValue>
          <Unit>Мбит/с</Unit>
        </InfoMeter>
        <InfoMeter>
          <MeterName>Пинг</MeterName>
          <Canvas id="pingMeter" />
          <MeterValue id="pingText">0.00</MeterValue>
          <Unit>мс</Unit>
        </InfoMeter>
        <InfoMeter>
          <MeterName>Джиттер</MeterName>
          <Canvas id="jitMeter" />
          <MeterValue id="jitText">0.00</MeterValue>
          <Unit>мс</Unit>
        </InfoMeter>
      </Meters>
      <ButtonContainer>
        <Button as="button" id="startStopBtn" onClick={window.startStop}>
          запустить
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
}
