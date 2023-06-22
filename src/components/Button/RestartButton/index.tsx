import React from 'react';
import Link from 'next/link';
import { BorderedButton } from '@Styles/theme';
import ROUTE_PATH from '@Constant/routePath';

// HJ TODO: props를 전달 받아야 할까?
function RestartButton() {
  return (
    <Link href={ROUTE_PATH.landing}>
      <BorderedButton style={{ width: '100%' }}>처음으로</BorderedButton>
    </Link>
  );
}

export default RestartButton;
