import bonusColorData from '@Data/bonusColorData';

const findColorDataByType = (type: string) => {
  const foundData = bonusColorData.find((data) => data.type === type);

  if (!foundData)
    throw new Error(`${type}에 해당하는 bonusColorData를 찾을 수 없습니다.`);

  return foundData;
};

const getBonusColorOptions = (bonusColorTypes: string[]) => {
  if (!bonusColorTypes || bonusColorTypes.length < 2) return;

  const colorData = bonusColorTypes.map((type) => findColorDataByType(type));

  if (bonusColorTypes.length === 2) {
    return colorData
      .map(({ type, firstColors, secondColors }) => [
        { type, colors: firstColors },
        { type, colors: secondColors },
      ])
      .flat();
  }

  if (bonusColorTypes.length === 3) {
    const threeOptions = colorData.map(({ type, firstColors }) => ({
      type,
      colors: firstColors,
    }));

    const duplicateOption = {
      type: colorData[0].type,
      colors: colorData[0].secondColors,
    };

    return [...threeOptions, duplicateOption];
  }

  if (bonusColorTypes.length === 4) {
    return colorData.map(({ type, firstColors }) => ({
      type,
      colors: firstColors,
    }));
  }

  const TOP_KOREAN_TYPES = [
    'autumnmute',
    'summercool',
    'autumndeep',
    'summerlight',
  ];

  return TOP_KOREAN_TYPES.map((type) => findColorDataByType(type)).map(
    ({ type, firstColors }) => ({ type, colors: firstColors })
  );
};

export default getBonusColorOptions;
