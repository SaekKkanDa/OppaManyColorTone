import React from 'react';
import { $Explanation } from './style';
import { FormattedMessage } from 'react-intl';

function Guidance() {
  return (
    <$Explanation>
      <FormattedMessage id="explanation-1" />
      <p>
        <FormattedMessage id="explanation-2" />
        <br />
        <FormattedMessage id="explanation-3" />
      </p>
    </$Explanation>
  );
}

export default Guidance;
