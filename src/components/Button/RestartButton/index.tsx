import Link from 'next/link';
import { BorderedButton } from '@Styles/theme';
import ROUTE_PATH from '@Constant/routePath';
import { FormattedMessage } from 'react-intl';

// HJ TODO: props를 전달 받아야 할까?
function RestartButton() {
  return (
    <Link href={ROUTE_PATH.landing}>
      <BorderedButton style={{ width: '100%' }}>
        <FormattedMessage id="restart" />
      </BorderedButton>
    </Link>
  );
}

export default RestartButton;
