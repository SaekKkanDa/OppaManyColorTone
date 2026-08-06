export const CHART_SIZE = 360;
export const CENTER = CHART_SIZE / 2;
export const OUTER_RADIUS = 168;
export const AVATAR_RING_RADIUS = 118;
export const CENTER_CIRCLE_RADIUS = 52;
export const AXIS_LABEL_RADIUS = 36;
export const AVATAR_DIAMETER = 54;

// Each season occupies a 90° quadrant starting from 12 o'clock (0°):
//   Spring : 0°  – 90°  (12–3 o'clock)
//   Summer : 90° – 180° (3–6 o'clock)
//   Autumn : 180°– 270° (6–9 o'clock)
//   Winter : 270°– 360° (9–12 o'clock)
// 3 sub-types per season sit inside the quadrant at 15°, 45°, 75° from the quadrant start
// (i.e. 30° apart with 15° margin from the edges).
export function getAvatarAngleDeg(index: number): number {
  return 15 + index * 30;
}

export function polarToCartesian(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.sin(rad),
    y: CENTER - radius * Math.cos(rad),
  };
}

// 8 tone axis labels placed at 45° intervals.
// - Shared tones (Bright/Light/Mute/Deep) sit on the boundary between the two
//   seasons that share them (cardinal positions).
// - Seasonal signature tones (Warm×2 for Spring/Autumn, Cool×2 for Summer/Winter)
//   sit at the center of their respective quadrants.
//   0°   (12 o'clock, Winter↔Spring boundary)   = Bright
//   45°  (Spring center)                        = Warm
//   90°  (3 o'clock, Spring↔Summer boundary)    = Light
//   135° (Summer center)                        = Cool
//   180° (6 o'clock, Summer↔Autumn boundary)    = Mute
//   225° (Autumn center)                        = Warm
//   270° (9 o'clock, Autumn↔Winter boundary)    = Deep
//   315° (Winter center)                        = Cool
export const AXIS_LABELS = [
  { key: 'bright', label: 'Bright', angle: 0 },
  { key: 'warm-spring', label: 'Warm', angle: 45 },
  { key: 'light', label: 'Light', angle: 90 },
  { key: 'cool-summer', label: 'Cool', angle: 135 },
  { key: 'mute', label: 'Mute', angle: 180 },
  { key: 'warm-autumn', label: 'Warm', angle: 225 },
  { key: 'deep', label: 'Deep', angle: 270 },
  { key: 'cool-winter', label: 'Cool', angle: 315 },
] as const;

// Season labels sit at the center of each quadrant. anchorIndex points to
// color[] for the "true"/neutral sub-type of that season (springwarm=1, etc.),
// used only to pick a theme text color for the label.
export const SEASON_LABELS = [
  { key: 'spring', label: 'SPRING', angle: 45, anchorIndex: 1 },
  { key: 'summer', label: 'SUMMER', angle: 135, anchorIndex: 4 },
  { key: 'autumn', label: 'AUTUMN', angle: 225, anchorIndex: 7 },
  { key: 'winter', label: 'WINTER', angle: 315, anchorIndex: 10 },
] as const;

// Maps each of the 12 color types (by their index in color[]) to the axis
// label that best characterizes it. The two "Warm" axes (spring vs autumn)
// and two "Cool" axes (summer vs winter) are disambiguated by suffix.
export const TYPE_INDEX_TO_AXIS_KEY = [
  'bright', // 0  springbright
  'warm-spring', // 1  springwarm
  'light', // 2  springlight
  'light', // 3  summerlight
  'cool-summer', // 4  summercool
  'mute', // 5  summermute
  'mute', // 6  autumnmute
  'warm-autumn', // 7  autumnwarm
  'deep', // 8  autumndeep
  'deep', // 9  winterdeep
  'cool-winter', // 10 wintercool
  'bright', // 11 winterbright
] as const;
