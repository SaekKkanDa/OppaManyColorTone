import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import AlertModal from '@Components/AlertModal/AlertModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import * as S from './style';

function Guidance() {
  // alert modal
  const [alertModal, setAlertModal] = useState('');

  const onClickQuestionIcon = () => {
    setAlertModal('colorChoiceExplanation');
  };

  return (
    <S.Explanation>
      <FormattedMessage id="explanation_1" />{' '}
      <FontAwesomeIcon icon={faCircleQuestion} onClick={onClickQuestionIcon} />
      {alertModal && (
        <AlertModal
          alertModal={alertModal}
          setAlertModal={setAlertModal}
          smallTextSize={true}
        />
      )}
      <p>
        <FormattedMessage id="explanation_2" />
        <br />
        <FormattedMessage id="explanation_3" />
      </p>
    </S.Explanation>
  );
}

export default Guidance;
