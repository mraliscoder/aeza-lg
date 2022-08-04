import React from "react";
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
  selectedLocation: {
    name: string;
    code: string;
  };
}

export default function TestFiles({ selectedLocation }: TestFilesProps) {
  const files = [
    {
      name: "10 МБ",
      size: "10MB",
    },
    {
      name: "100 МБ",
      size: "100MB",
    },
    {
      name: "1 ГБ",
      size: "1GB",
    },
    {
      name: "10 ГБ",
      size: "10GB",
    },
  ];

  return (
    <div>
      <Texts>
        <Title>тестовые файлы</Title>
        <Description>
          протестируйте скорость загрузки с вашего сервера
        </Description>
      </Texts>
      {files.map(({ name, size }) => (
        <InputContainer key={size}>
          <Link
            href={`https://${selectedLocation.code}.lg.aeza.net/files/${size}`}
          >
            {`тестовый файл ${name}`}
          </Link>
          <Input
            disabled
            value={`wget -O /dev/null https://${selectedLocation.code}.lg.aeza.net/files/${size}`}
          />
        </InputContainer>
      ))}
    </div>
  );
}
