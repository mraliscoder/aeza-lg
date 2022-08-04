import React from "react";
import styled from "styled-components";

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
  return (
    <Wrapper>
      <Links>
        <LinkWrapper>
          <Link href="https://aeza.net" target="_blank">
            сайт
          </Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link href="https://my.aeza.net" target="_blank">
            биллинг
          </Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link href="https://t.me/aezahost" target="_blank">
            телеграм
          </Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link href="https://vk.com/aezahost" target="_blank">
            вконтакте
          </Link>
        </LinkWrapper>
      </Links>
    </Wrapper>
  );
}
