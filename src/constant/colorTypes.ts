/** 계절별로 묶은 12타입. 상세 페이지 목록, sitemap, 가이드 링크의 순서 기준 */
export const COLOR_TYPES_BY_SEASON: Record<ColorSeason, ColorType[]> = {
  spring: ['springwarm', 'springbright', 'springlight'],
  summer: ['summercool', 'summermute', 'summerlight'],
  autumn: ['autumnwarm', 'autumnmute', 'autumndeep'],
  winter: ['wintercool', 'winterdeep', 'winterbright'],
};

export const SEASONS: ColorSeason[] = ['spring', 'summer', 'autumn', 'winter'];

export const COLOR_TYPES: ColorType[] = SEASONS.flatMap(
  (season) => COLOR_TYPES_BY_SEASON[season]
);

export function isColorType(value: unknown): value is ColorType {
  return (
    typeof value === 'string' && (COLOR_TYPES as string[]).includes(value)
  );
}

export function getSeason(type: ColorType): ColorSeason {
  return SEASONS.find((season) => type.startsWith(season)) ?? 'spring';
}
