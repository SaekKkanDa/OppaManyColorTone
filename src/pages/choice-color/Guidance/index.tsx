import React from 'react';
import { $Explanation } from './style';
import { FormattedMessage } from 'react-intl';

function Guidance() {
  return (
    <$Explanation>
      <FormattedMessage id="explanation_1" />
      <p>
        <FormattedMessage id="explanation_2" />
        <br />
        <FormattedMessage id="explanation_3" />
      </p>
    </$Explanation>
  );
}

export default Guidance;
