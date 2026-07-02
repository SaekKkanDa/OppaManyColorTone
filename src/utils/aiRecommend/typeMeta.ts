const TYPE_META: Record<ColorType, { season: ColorSeason; tone: ColorTone }> = {
  springbright: { season: 'spring', tone: 'bright' },
  springwarm: { season: 'spring', tone: 'warm' },
  springlight: { season: 'spring', tone: 'light' },
  summerlight: { season: 'summer', tone: 'light' },
  summercool: { season: 'summer', tone: 'cool' },
  summermute: { season: 'summer', tone: 'mute' },
  autumnmute: { season: 'autumn', tone: 'mute' },
  autumnwarm: { season: 'autumn', tone: 'warm' },
  autumndeep: { season: 'autumn', tone: 'deep' },
  winterdeep: { season: 'winter', tone: 'deep' },
  wintercool: { season: 'winter', tone: 'cool' },
  winterbright: { season: 'winter', tone: 'bright' },
};

export function getSeasonToneByType(type: ColorType) {
  return TYPE_META[type];
}
