import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import omctDb from '@Utils/omctDb';
import ROUTE_PATH from '@Constant/routePath';
import type { Type } from '@Data/color';

const useSelectBonusColorTypes = (
  selectedTypes: Type[],
  MAX_STAGE_NUM: number
) => {
  const [bonusColorTypes, setBonusColorTypes] = useState<string[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const isBasicStageDone = selectedTypes.length === MAX_STAGE_NUM;

    if (isBasicStageDone) {
      omctDb.addNumberOfUsers();

      goToBonusStageOrResult();
    }

    function goToBonusStageOrResult() {
      const modeTypes = getModeTypes(selectedTypes);

      if (modeTypes.length === 1) {
        navigate({
          pathname: ROUTE_PATH.result,
          search: createSearchParams({ colorType: modeTypes[0] }).toString(),
        });

        return;
      }

      setBonusColorTypes(modeTypes);
    }
  }, [selectedTypes, MAX_STAGE_NUM, navigate]);

  return bonusColorTypes;
};

function getModeTypes(selectedTypes: Type[]) {
  const count: { [key: string]: number } = {};
  let maxFreq = 0;

  selectedTypes.forEach((selectedType) => {
    count[selectedType] = count[selectedType] + 1 || 1;

    if (count[selectedType] > maxFreq) maxFreq = count[selectedType];
  });

  const modeTypes = Object.entries(count)
    .filter(([, value]) => value === maxFreq)
    .map(([key]) => key);

  return modeTypes;
}

export default useSelectBonusColorTypes;
