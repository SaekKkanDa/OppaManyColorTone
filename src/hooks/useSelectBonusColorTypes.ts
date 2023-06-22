import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import omctDb from '@Utils/omctDb';
import ROUTE_PATH from '@Constant/routePath';

const useSelectBonusColorTypes = (
  selectedTypes: ColorType[],
  MAX_STAGE_NUM: number
) => {
  const [bonusColorTypes, setBonusColorTypes] = useState<string[] | null>(null);

  const router = useRouter();
  const searchParams = router.query as Record<string, string>;

  useEffect(() => {
    const isBasicStageDone = selectedTypes.length === MAX_STAGE_NUM;

    if (isBasicStageDone) {
      omctDb.addNumberOfUsers();

      goToBonusStageOrResult();
    }

    function goToBonusStageOrResult() {
      const modeTypes = getModeTypes(selectedTypes);

      if (modeTypes.length === 1) {
        const params = new URLSearchParams(searchParams);
        params.set('colorType', modeTypes[0]);
        router.push(`${ROUTE_PATH.result}?${params}`);
        return;
      }

      setBonusColorTypes(modeTypes);
    }
  }, [selectedTypes, MAX_STAGE_NUM, searchParams, router]);

  return bonusColorTypes;
};

function getModeTypes(selectedTypes: ColorType[]) {
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
