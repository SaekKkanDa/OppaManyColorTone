import { Fragment, ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { flexCustom, layout } from '@Styles/theme';
import SiteFooter from '@Components/SiteFooter';

export interface InfoSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
  /** items 와 같은 순서의 내부 링크. 값이 있는 항목은 링크로 렌더링한다. */
  itemLinks?: (string | undefined)[];
}

interface InfoArticleProps {
  title: string;
  intro: string;
  sections: InfoSection[];
  /** 개인정보처리방침 시행일 등 제목 아래 보조 문구 */
  meta?: string;
  /** 본문 섹션 뒤, 푸터 앞에 붙는 추가 콘텐츠 */
  children?: ReactNode;
}

// URL / 이메일 끝에 붙은 문장부호(, . ))는 링크에서 뺀다.
const LINK_PATTERN =
  /(https?:\/\/[^\s)]*[^\s).,]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

/** 문구 안의 URL / 이메일 주소를 링크로 바꾼다. */
function Linkified({ text }: { text: string }) {
  const parts = text.split(LINK_PATTERN);

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 0) return <Fragment key={index}>{part}</Fragment>;

        const isEmail = !part.startsWith('http');
        return (
          <a
            key={index}
            href={isEmail ? `mailto:${part}` : part}
            {...(isEmail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
          >
            {part}
          </a>
        );
      })}
    </>
  );
}

/** 소개 / 개인정보처리방침처럼 글 위주 페이지의 공통 레이아웃 */
function InfoArticle({
  title,
  intro,
  sections,
  meta,
  children,
}: InfoArticleProps) {
  return (
    <Wrapper>
      <Article>
        <Title>{title}</Title>
        {meta && <Meta>{meta}</Meta>}
        <Intro>
          <Linkified text={intro} />
        </Intro>

        {sections.map((section) => (
          <Section key={section.title}>
            <SectionTitle>{section.title}</SectionTitle>
            {section.paragraphs?.map((paragraph) => (
              <Paragraph key={paragraph}>
                <Linkified text={paragraph} />
              </Paragraph>
            ))}
            {section.items && (
              <List>
                {section.items.map((item, index) => {
                  const href = section.itemLinks?.[index];
                  return (
                    <li key={item}>
                      {href ? (
                        <Link href={href}>{item}</Link>
                      ) : (
                        <Linkified text={item} />
                      )}
                    </li>
                  );
                })}
              </List>
            )}
          </Section>
        ))}

        {children}
      </Article>

      <SiteFooter />
    </Wrapper>
  );
}

export default InfoArticle;

const Wrapper = styled.div`
  ${layout}
  ${flexCustom('column', 'stretch', 'space-between')}
  row-gap: 2.5rem;
`;

const Article = styled.article`
  ${flexCustom('column', 'stretch', 'flex-start')}
  row-gap: 1.5rem;
  color: ${({ theme }) => theme.gray[800]};
  font-size: ${({ theme }) => theme.font.size.md};
  line-height: 1.7;
  word-break: keep-all;
  overflow-wrap: anywhere;

  a {
    color: ${({ theme }) => theme.gray[900]};
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.font.size['1.5xl']};
  line-height: 1.3;
`;

const Meta = styled.p`
  margin-top: -1rem;
  color: ${({ theme }) => theme.gray[500]};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

const Intro = styled.p``;

const Section = styled.section`
  ${flexCustom('column', 'stretch', 'flex-start')}
  row-gap: 0.5rem;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.lg};
  line-height: 1.4;
`;

const Paragraph = styled.p``;

const List = styled.ul`
  ${flexCustom('column', 'stretch', 'flex-start')}
  row-gap: 0.5rem;
  padding-left: 1.25rem;
  list-style: disc;

  /* 항목 안의 \n 을 줄바꿈으로 보여준다 (예: 가이드 FAQ 의 Q / A) */
  li {
    white-space: pre-line;
  }
`;
