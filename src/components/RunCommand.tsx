import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import {
  mediaQueries,
  Title as BaseTitle,
  Description,
  Label,
  Input,
  Button,
} from "./UI";

import arrowIcon from "../images/arrow.svg";

const Wrapper = styled.div`
  margin-bottom: 60px;

  ${mediaQueries.desktop} {
    margin-bottom: 0;
  }
`;

const Texts = styled.div`
  margin-bottom: 24px;

  ${mediaQueries.desktop} {
    padding-right: ${100 / 6}%;
  }
`;

const Title = styled(BaseTitle)`
  ${mediaQueries.desktop} {
    font-size: 36px;
    line-height: 40px;
  }
`;

const InputContainer = styled.div`
  & + & {
    margin-top: 24px;
  }
`;

const Select = styled.select`
  padding: 16px 50px 16px 12px;
  margin-top: 8px;
  display: block;
  font-size: 16px;
  border-radius: 12px;
  border: none;
  background: #f8f8f8;

  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: url(${arrowIcon});
  background-size: 24px 24px;
  background-repeat: no-repeat;
  background-position-x: calc(100% - 12px);
  background-position-y: 14px;
`;

const Results = styled.div`
  margin-top: 35px;
`;

const commands = {
  ping: "ping",
  traceroute: "traceroute",
};

interface RunCommandProps {
  selectedLocation: string;
}

export default function RunCommand({ selectedLocation }: RunCommandProps) {
  const { t } = useTranslation();
  const [isLoading, setLoading] = React.useState(false);
  const [selectedCommand, setCommand] = React.useState(commands.ping);
  const [resource, setResource] = React.useState("");
  const [response, setResponse] = React.useState<string[]>([]);

  const formSubmit = React.useCallback(() => {
    setLoading(true);

    fetch(`https://${selectedLocation}.lg.aeza.net/run/${selectedCommand}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: resource,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setResponse(res.data);
        } else {
          setResponse(["?????????????????? ????????????"]);
        }

        setLoading(false);
      })
      .catch((e) => {
        console.warn(e);
        setResponse([
          "???? ?????????????????????? ?????????????? ????????????.",
          "???????? ???? ???????????? ?????????????????? ??????????, ?????????????? ?????? ?????? ??????????????????.",
        ]);
        setLoading(false);
      });
  }, [selectedCommand, resource, selectedLocation]);

  return (
    <Wrapper>
      <Texts>
        <Title>{t("run.title")}</Title>
      </Texts>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formSubmit();
        }}
      >
        <InputContainer>
          <Label>{t("run.command")}</Label>
          <Select
            value={selectedCommand}
            onChange={(e) => setCommand(e.target.value)}
            required
          >
            {Object.entries(commands).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>{t("run.resource")}</Label>
          <Input
            type="text"
            placeholder="aeza.net"
            value={resource}
            onChange={(e) => setResource(e.target.value)}
            required
          />
        </InputContainer>
        <Button
          as="button"
          disabled={isLoading}
          style={{ marginTop: "24px" }}
          type="submit"
        >
          {t("run.start")}
        </Button>
      </form>
      {response.length > 0 && (
        <Results>
          <Texts>
            <Title>{t("run.result")}</Title>
            {/* <Description>????????</Description> */}
          </Texts>
          <Description>
            {response.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </Description>
        </Results>
      )}
    </Wrapper>
  );
}
