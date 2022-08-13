import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 20px;
`;

const Links = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: center;
  list-style: none;
`;

const LinkWrapper = styled.li`
  & + & {
    margin-left: 15px;
  }
`;

const Link = styled.a`
  font-size: 16px;
  color: #8e8e8e;
  cursor: pointer;
  text-decoration: none;
  transition: color 150ms cubic-bezier(0.65, 0, 0.35, 1);

  &:hover {
    color: rgba(116, 116, 116, 0.5);
  }
`;

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Links>
        {t<any, any>("links", { returnObjects: true }).map(
          ({ title, url }: any) => (
            <LinkWrapper key={url}>
              <Link href={url} target="_blank">
                {title}
              </Link>
            </LinkWrapper>
          )
        )}
      </Links>
    </Wrapper>
  );
}
