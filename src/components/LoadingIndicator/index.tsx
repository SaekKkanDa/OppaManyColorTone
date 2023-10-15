import indicatorImg from 'public/images/icon/color-spinner.png';
import * as S from './style';

function LoadingIndicator() {
  return (
    <S.Container>
      <S.Indicator
        src={indicatorImg.src}
        alt="loading"
        width={48}
        height={48}
        priority
      />
    </S.Container>
  );
}

export default LoadingIndicator;
