import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import ROUTE_PATH from '@Constant/routePath';

const getMaxTypes = (typeCount: { [key: string]: number }) => {
  const maxCount = Math.max(...Object.values(typeCount));

  return Object.keys(typeCount).filter((type) => typeCount[type] === maxCount);
};

const useChoiceColor = (maxStageNum: number) => {
  const [selectedTypeCount, setSelectedTypeCount] = useState({
    springbright: 0,
    springwarm: 0,
    springlight: 0,
    summerlight: 0,
    summercool: 0,
    summermute: 0,
    autumnmute: 0,
    autumnwarm: 0,
    autumndeep: 0,
    winterdeep: 0,
    wintercool: 0,
    winterbright: 0,
  });

  const [bonusColorTypes, setBonusColorTypes] = useState<string[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const isBasicStageDone =
      Object.values(selectedTypeCount).reduce((acc, cur) => acc + cur) ===
      maxStageNum + 1;

    const goToBonusStageOrResult = (maxTypes: string[]) => {
      if (maxTypes.length === 1) {
        const resultType = maxTypes[0];

        navigate({
          pathname: ROUTE_PATH.result,
          search: createSearchParams({ colorType: resultType }).toString(),
        });

        return;
      }

      setBonusColorTypes(maxTypes);
    };

    if (isBasicStageDone) {
      const maxTypes = getMaxTypes(selectedTypeCount);
      goToBonusStageOrResult(maxTypes);
    }
  }, [selectedTypeCount, navigate, maxStageNum]);

  return { setSelectedTypeCount, bonusColorTypes };
};

export default useChoiceColor;
