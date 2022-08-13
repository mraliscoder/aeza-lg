import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import {
  mediaQueries,
  Title as BaseTitle,
  Description,
  Link,
  Input as BaseInput,
} from "./UI";

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
  overflow: auto;
`;

const Input = styled(BaseInput)`
  min-width: 430px;
`;

interface TestFilesProps {
  selectedLocation: string;
}

export default function TestFiles({ selectedLocation }: TestFilesProps) {
  const { t } = useTranslation();

  const files = [
    {
      name: `10 ${t("testFiles.mb")}`,
      size: "10MB",
    },
    {
      name: `100 ${t("testFiles.mb")}`,
      size: "100MB",
    },
    {
      name: `1 ${t("testFiles.gb")}`,
      size: "1GB",
    },
    {
      name: `10 ${t("testFiles.gb")}`,
      size: "10GB",
    },
  ];

  return (
    <div>
      <Texts>
        <Title>{t("testFiles.title")}</Title>
        <Description>{t("testFiles.description")}</Description>
      </Texts>
      {files.map(({ name, size }) => (
        <InputContainer key={size}>
          <Link href={`https://${selectedLocation}.lg.aeza.net/files/${size}`}>
            {`${t("testFiles.testFile")} ${name}`}
          </Link>
          <Input
            disabled
            value={`wget -O /dev/null https://${selectedLocation}.lg.aeza.net/files/${size}`}
          />
        </InputContainer>
      ))}
    </div>
  );
}
