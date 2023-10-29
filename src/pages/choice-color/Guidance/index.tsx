import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import AlertModal from '@Components/AlertModal';

import * as S from './style';

function Guidance() {
  const [isOpenGuideModal, setIsOpenGuideModal] = useState(false);

  const handleOpenGuideModal = () => {
    setIsOpenGuideModal(true);
  };

  return (
    <S.Guidance>
      <FormattedMessage id="explanation_1" />{' '}
      <button onClick={handleOpenGuideModal}>
        <FontAwesomeIcon icon={faCircleQuestion} />
      </button>
      {isOpenGuideModal && (
        <AlertModal
          isOpen={isOpenGuideModal}
          title="colorChoiceGuideTitle"
          handleClose={() => setIsOpenGuideModal(false)}
        >
          <S.ColorChoiceGuideWrapper>
            {[
              'colorChoiceGuideExplanation_1',
              'colorChoiceGuideExplanation_2',
              'colorChoiceGuideExplanation_3',
            ].map((messageId) => (
              <p key={messageId}>
                <FormattedMessage id={messageId} />
              </p>
            ))}
          </S.ColorChoiceGuideWrapper>
        </AlertModal>
      )}
      <S.Explanation>
        <FormattedMessage id="explanation_2" />
        <br />
        <FormattedMessage id="explanation_3" />
      </S.Explanation>
    </S.Guidance>
  );
}

export default Guidance;
