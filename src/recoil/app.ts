import { atom } from 'recoil';

/**
 * 상용 방법
 * 1. recoil을 임포트 해온다
 * 2. key와 default를 설정해 준다.
 *
 * 사용 페이지 / 사용 방법
 * 1. 호출
 * import {useRecoilState} from 'recoil'
 * import { CropImage } from "@/recoil/App";
 * 2. 선언
 * const [cropImage, setCropImage] = useRecoilState(CropImage);
 * 3.파일 사용
 * useEffect(()=>{},cropImage)
 *
 *
 * App Page
 * <RecoilRoot>
 *  <CharacterCounter />
 * </RecoilRoot>
 *
 * 혹시 사용 방법이 다르거나 어렵거나 하시면 알려주세요
 */
export const CropImage = atom({
  key: 'cropImage',
  default: '',
});

export const Result = atom({
  key: 'result',
  default: '',
});
