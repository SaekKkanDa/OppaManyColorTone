import { localStorageEffect } from '@Recoil/recoilExtension';
import { atom } from 'recoil';

const KEY_PREFIX = 'choiceColor';

export const onboardingState = atom({
  key: `${KEY_PREFIX}_onboarding`,
  default: true,
  effects: [localStorageEffect('onboarding')],
});

export const onboardingElState = atom<null | HTMLElement>({
  key: `${KEY_PREFIX}_onboardingEl`,
  default: null,
});

export const onboardingAiButtonElState = atom<null | HTMLElement>({
  key: `${KEY_PREFIX}_onboardingAiButtonEl`,
  default: null,
});
