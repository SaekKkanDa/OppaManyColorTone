import React from 'react';
import Link from 'next/link';

import * as S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faLink, faShare } from '@fortawesome/free-solid-svg-icons';
import kakaoIcon from 'public/images/icon/kakaoIcon.png';

import ROUTE_PATH from '@Constant/routePath';
import useKakaoShare from '@Hooks/useKakaoShare';
import { copyUrl } from '@Utils/clipboard';
import { webShare } from '@Utils/share';
import { isChrome, isOSX } from '@Utils/userAgent';
import RestartButton from '@Components/Button/RestartButton';
import { FormattedMessage } from 'react-intl';
import { captureAndDownload, checkIfKakaoAndAlert } from './share.logic';

interface MenuSubPageProps {
  resultContainerRef: React.RefObject<HTMLDivElement>;
  colorType: string;
  setAlertModal: React.Dispatch<React.SetStateAction<string>>;
}

function ShareSubPage({
  resultContainerRef,
  colorType,
  setAlertModal,
}: MenuSubPageProps) {
  const { isLoading, kakaoShare } = useKakaoShare();
  const kakaoAlertMsg = checkIfKakaoAndAlert();

  const onClickCapture = async () => {
    if (kakaoAlertMsg) {
      setAlertModal(kakaoAlertMsg);
      return;
    }

    const wrapper = resultContainerRef.current;
    if (!wrapper) return;

    const imgName = `${colorType}-result.png`;
    captureAndDownload(wrapper, imgName);
  };

  const onClickLinkCopy = async () => {
    if (kakaoAlertMsg) {
      setAlertModal(kakaoAlertMsg);
      return;
    }
    copyUrl(location.href);
  };

  const onClickKakaoShare = () => {
    if (isLoading) {
      setAlertModal('다시 시도해주세요. 🥰');
    } else {
      kakaoShare();
    }
  };

  const onClickShare = async () => {
    if (kakaoAlertMsg) {
      setAlertModal(kakaoAlertMsg);
      return;
    }

    if (isChrome() && isOSX()) {
      setAlertModal(
        'macOS 환경의 크롬 브라우저에서는 지원하지 않는 기능입니다.\n다른 브라우저에서 실행해 주세요. 🥰'
      );
      return;
    }

    await webShare();
  };

  return (
    <>
      <S.MenuContainer>
        <S.MenuItemWrapper>
          <S.MenuItemButton onClick={onClickCapture}>
            <FontAwesomeIcon icon={faDownload} color={'white'} />
          </S.MenuItemButton>
          <S.MenuItemName>
            <FormattedMessage id="saveResult" />
          </S.MenuItemName>
        </S.MenuItemWrapper>

        <S.MenuItemWrapper>
          <S.MenuItemButton onClick={onClickLinkCopy}>
            <FontAwesomeIcon icon={faLink} color={'white'} />
          </S.MenuItemButton>
          <S.MenuItemName>
            <FormattedMessage id="copyUrl" />
          </S.MenuItemName>
        </S.MenuItemWrapper>

        <S.MenuItemWrapper>
          <S.KakaoShareButton onClick={onClickKakaoShare}>
            <S.MenuItemImg
              src={kakaoIcon}
              alt="카카오톡 공유 버튼"
              width={48}
              height={48}
            />
          </S.KakaoShareButton>
          <S.MenuItemName>
            <FormattedMessage id="kakaotalk" />
          </S.MenuItemName>
        </S.MenuItemWrapper>

        <S.MenuItemWrapper>
          <S.MenuItemButton onClick={onClickShare}>
            <FontAwesomeIcon icon={faShare} color={'white'} />
          </S.MenuItemButton>
          <S.MenuItemName>
            <FormattedMessage id="shareResult" />
          </S.MenuItemName>
        </S.MenuItemWrapper>
      </S.MenuContainer>

      <S.ButtonsWrapper>
        <Link href={ROUTE_PATH.allTypesView}>
          <S.AllTypesButton>
            <FormattedMessage id="allTypes" />
          </S.AllTypesButton>
        </Link>
        <RestartButton />
      </S.ButtonsWrapper>
    </>
  );
}
export default ShareSubPage;
