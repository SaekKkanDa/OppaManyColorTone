import { useTranslation } from 'next-i18next';

import color from '@Data/color';
import resultColorData from '@Data/resultColorData';

import {
  AVATAR_RING_RADIUS,
  AXIS_LABELS,
  AXIS_LABEL_RADIUS,
  CENTER,
  CENTER_CIRCLE_RADIUS,
  CHART_SIZE,
  OUTER_RADIUS,
  SEASON_LABELS,
  getAvatarAngleDeg,
  polarToCartesian,
} from './constants';
import * as S from './style';

type Props = {
  selectedIndex: number | undefined;
  hoveredIndex: number | undefined;
  onSelect: (index: number) => void;
  onHover: (index: number | undefined) => void;
};

const SEASON_LABEL_OFFSET = OUTER_RADIUS + 22;

function quadrantPath(startAngleDeg: number): string {
  // 90° arc pie slice from center of chart
  const start = polarToCartesian(startAngleDeg, OUTER_RADIUS);
  const end = polarToCartesian(startAngleDeg + 90, OUTER_RADIUS);
  return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 1 ${end.x} ${end.y} Z`;
}

function CompassChart({ selectedIndex, hoveredIndex, onSelect, onHover }: Props) {
  const { t } = useTranslation('common');

  return (
    <S.Wrapper>
      <S.Svg viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`} aria-hidden>
        {/* Season quadrant backgrounds */}
        <g opacity="0.12">
          {SEASON_LABELS.map(({ key, angle, anchorIndex }) => (
            <path
              key={key}
              d={quadrantPath(angle - 45)}
              fill={color[anchorIndex].textColor}
            />
          ))}
        </g>

        {/* Outer boundary */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={OUTER_RADIUS}
          fill="none"
          stroke="#c4b58e"
          strokeWidth="1.2"
          opacity="0.55"
        />

        {/* Avatar orbit guide */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={AVATAR_RING_RADIUS}
          fill="none"
          stroke="#c4b58e"
          strokeWidth="0.8"
          strokeDasharray="3 4"
          opacity="0.5"
        />

        {/* Quadrant divider lines */}
        <line
          x1={CENTER}
          y1={CENTER - OUTER_RADIUS}
          x2={CENTER}
          y2={CENTER + OUTER_RADIUS}
          stroke="#c4b58e"
          strokeWidth="0.6"
          opacity="0.35"
        />
        <line
          x1={CENTER - OUTER_RADIUS}
          y1={CENTER}
          x2={CENTER + OUTER_RADIUS}
          y2={CENTER}
          stroke="#c4b58e"
          strokeWidth="0.6"
          opacity="0.35"
        />

        {/* Center compass circle */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={CENTER_CIRCLE_RADIUS}
          fill="#fff9e8"
          stroke="#b8a370"
          strokeWidth="1.2"
        />

        {/* Divider lines between the 8 tone sectors (midpoints between labels) */}
        <g stroke="#c4b58e" strokeWidth="0.7" opacity="0.5">
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => {
            const inner = polarToCartesian(angle, 6);
            const outer = polarToCartesian(angle, CENTER_CIRCLE_RADIUS);
            return (
              <line
                key={angle}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
              />
            );
          })}
        </g>

        <circle cx={CENTER} cy={CENTER} r="5" fill="#8a6d3b" />

        {/* 6 axis labels inside the center circle */}
        {AXIS_LABELS.map(({ key, label, angle }) => {
          const { x, y } = polarToCartesian(angle, AXIS_LABEL_RADIUS);
          return (
            <text
              key={key}
              x={x}
              y={y + 3}
              textAnchor="middle"
              fontSize="10"
              fontFamily="'Noto Sans KR', sans-serif"
              fontWeight="500"
              fill="#7a5c2a"
            >
              {label}
            </text>
          );
        })}
      </S.Svg>

      {/* Season labels (HTML overlay for easier positioning) */}
      {SEASON_LABELS.map(({ key, label, angle, anchorIndex }) => {
        const { x, y } = polarToCartesian(angle, SEASON_LABEL_OFFSET);
        return (
          <S.SeasonLabel
            key={key}
            $left={x}
            $top={y}
            $color={color[anchorIndex].textColor}
          >
            {label}
          </S.SeasonLabel>
        );
      })}

      {/* 12 celebrity avatars */}
      {color.map(({ type, textColor }, index) => {
        const { x, y } = polarToCartesian(
          getAvatarAngleDeg(index),
          AVATAR_RING_RADIUS
        );
        const representative = resultColorData[type].celebrities[0];
        const isActive =
          selectedIndex === index || hoveredIndex === index;
        return (
          <S.AvatarButton
            key={type}
            $left={x}
            $top={y}
            $isActive={isActive}
            $accentColor={textColor}
            type="button"
            aria-label={t(`${type}.name`)}
            onClick={() => onSelect(index)}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onHover(undefined)}
            onFocus={() => onHover(index)}
            onBlur={() => onHover(undefined)}
          >
            <S.AvatarImage
              src={representative.imageURL}
              alt={representative.name}
              width={54}
              height={54}
            />
          </S.AvatarButton>
        );
      })}
    </S.Wrapper>
  );
}

export default CompassChart;
