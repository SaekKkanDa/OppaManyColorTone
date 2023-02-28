import COLOR_TYPE from '@Constant/colorType';

const {
  season: { spring, summer, autumn, winter },
  type: { warm, cool, bright, mute, light, deep },
} = COLOR_TYPE;

const color = [
  {
    season: spring,
    type: bright,
    color: [],
  },
  {
    season: spring,
    type: warm,
    color: [],
  },
  {
    season: spring,
    type: light,
    color: [],
  },

  {
    season: summer,
    type: light,
    color: [],
  },
  {
    season: summer,
    type: cool,
    color: [],
  },
  {
    season: summer,
    type: mute,
    color: [],
  },

  {
    season: autumn,
    type: mute,
    color: [],
  },
  {
    season: autumn,
    type: warm,
    color: [],
  },
  {
    season: autumn,
    type: deep,
    color: [],
  },

  {
    season: winter,
    type: deep,
    color: [],
  },
  {
    season: winter,
    type: cool,
    color: [],
  },
  {
    season: winter,
    type: bright,
    color: [],
  },
];

export default color;
