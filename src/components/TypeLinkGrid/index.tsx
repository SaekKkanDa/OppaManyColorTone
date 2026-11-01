import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

import { COLOR_TYPES_BY_SEASON, SEASONS } from '@Constant/colorTypes';
import ROUTE_PATH from '@Constant/routePath';
import resultColorData from '@Data/resultColorData';

interface TypeLinkGridProps {
  title?: string;
}

/** 계절별 12타입 상세 페이지 링크 */
function TypeLinkGrid({ title }: TypeLinkGridProps) {
  const { t } = useTranslation('common');

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {SEASONS.map((season) => (
        <SeasonRow key={season}>
          <SeasonName>{t(`season.${season}`)}</SeasonName>
          <TypeList>
            {COLOR_TYPES_BY_SEASON[season].map((type) => (
              <li key={type}>
                <TypeLink
                  href={`${ROUTE_PATH.types}/${type}`}
                  $color={resultColorData[type].textColor}
                >
                  {t(`${type}.name`)}
                </TypeLink>
              </li>
            ))}
          </TypeList>
        </SeasonRow>
      ))}
    </Wrapper>
  );
}

export default TypeLinkGrid;

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.size.lg};
  line-height: 1.4;
`;

const SeasonRow = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.75rem;
`;

const SeasonName = styled.span`
  flex-shrink: 0;
  width: 3.5rem;
  color: ${({ theme }) => theme.gray[500]};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

const TypeList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TypeLink = styled(Link)<{ $color: string }>`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border: 1px solid ${({ $color }) => $color};
  border-radius: 999px;
  color: ${({ theme }) => theme.gray[800]};
  font-size: 0.875rem;
  line-height: 1.2;

  && {
    text-decoration: none;
  }
`;
