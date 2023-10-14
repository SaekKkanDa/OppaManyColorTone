import { FormattedMessage } from 'react-intl';
import * as S from './style';

function Guidance() {
  return (
    <S.Explanation>
      <FormattedMessage id="explanation_1" />
      <p>
        <FormattedMessage id="explanation_2" />
        <br />
        <FormattedMessage id="explanation_3" />
      </p>
    </S.Explanation>
  );
}

export default Guidance;
