import styled from 'styled-components';

import { Button } from '@Styles/theme';

/** 결과 페이지의 "처음으로" 버튼과 같은 Button 을 링크로 쓴다 */
export const HomeButton = styled(Button)`
  display: block;
  margin-top: 2.5rem;
  font-family: var(--font-moyamoya); /* 링크(<a>)로 쓸 때도 버튼과 같은 글꼴 */
  text-align: center;

  /* InfoArticle 안의 링크 스타일(글자색, 밑줄)을 덮어쓴다 */
  && {
    color: ${({ theme }) => theme.white};
    text-decoration: none;
  }
`;
