import type { Type } from './color';

type BonusColorDataType = {
  type: Type;
  firstColors: [string, string, string];
  secondColors: [string, string, string];
};

const bonusColorData: BonusColorDataType[] = [
  {
    type: 'springbright',
    firstColors: ['#ff0442', '#00cc33', '#00bffe'],
    secondColors: ['#ee3425', '#00a96b', '#030281'],
  },
  {
    type: 'springwarm',
    firstColors: ['#ef4d53', '#b2d364', '#016cb0'],
    secondColors: ['#ee3425', '#93982e', '#1198ba'],
  },
  {
    type: 'springlight',
    firstColors: ['#F58D72', '#c5e1ab', '#b9f2ff'],
    secondColors: ['#ef6465', '#96c575', '#68cef2'],
  },
  {
    type: 'summerlight',
    firstColors: ['#e50770', '#b0eeea', '#74c7ec'],
    secondColors: ['#db3166', '#9bd7cc', '#88acd9'],
  },
  {
    type: 'summercool',
    firstColors: ['#b4025d', '#019287', '#6496ed'],
    secondColors: ['#e30870', '#61c5be', '#2065af'],
  },
  {
    type: 'summermute',
    firstColors: ['#c92c48', '#76988c', '#4880b6'],
    secondColors: ['#db0a56', '#4ad3cd', '#3d6994'],
  },
  {
    type: 'autumnmute',
    firstColors: ['#cc4054', '#8c956b', '#32527b'],
    secondColors: ['#b45a64', '#aabb9d', '#659acd'],
  },
  {
    type: 'autumnwarm',
    firstColors: ['#c51d3a', '#566c30', '#387687'],
    secondColors: ['#e2072e', '#93982e', '#06457e'],
  },
  {
    type: 'autumndeep',
    firstColors: ['#95011a', '#566c30', '#00416a'],
    secondColors: ['#cc163f', '#708644', '#357586'],
  },
  {
    type: 'winterdeep',
    firstColors: ['#af0a41', '#037278', '#002e5c'],
    secondColors: ['#640138', '#047c8c', '#030281'],
  },
  {
    type: 'wintercool',
    firstColors: ['#97004e', '#019287', '#030281'],
    secondColors: ['#e30870', '#01b3bb', '#456bcd'],
  },
  {
    type: 'winterbright',
    firstColors: ['#ec175a', '#319175', '#0180ff'],
    secondColors: ['#97004e', '#00a96b', '#00bffe'],
  },
];

export default bonusColorData;
