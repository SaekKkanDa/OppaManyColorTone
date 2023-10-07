import React from 'react';
import Link from 'next/link';

import * as S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faLink, faShare } from '@fortawesome/free-solid-svg-icons';
import kakaoIcon from 'public/images/icon/kakaoIcon.png';

import ROUTE_PATH from '@Constant/routePath';
import useKakaoShare from '@Hooks/useKakaoShare';
import { captureElement, downloadImage } from '@Utils/capture';
import { copyUrl } from '@Utils/clipboard';
import { webShare } from '@Utils/share';
import { isChrome, isKakao, isOSX } from '@Utils/userAgent';
import CustomError, { CustomErrorConstructor } from '@Utils/customError';
import RestartButton from '@Components/Button/RestartButton';
import { FormattedMessage } from 'react-intl';

interface MenuSubPageProps {
  resultContainerRef: React.RefObject<HTMLDivElement>;
  colorType: string;
}

function ShareSubPage({ resultContainerRef, colorType }: MenuSubPageProps) {
  const { isLoading, kakaoShare } = useKakaoShare();

  // HJ TODO: 네이밍 이상함..
  const kakaoAlert = () => {
    const _isKakao = isKakao();

    if (_isKakao) {
      alert(
        '카카오 인앱 브라우저에서는 지원하지 않는 기능입니다.\n다른 브라우저에서 실행해 주세요. 🥰'
      );
    }

    return _isKakao;
  };

  const handleCapture = async () => {
    if (kakaoAlert()) return;

    const wrapper = resultContainerRef.current;
    if (!wrapper) return;

    const imgName = `${colorType}-result.png`;
    const img = await captureElement(wrapper, imgName);
    downloadImage(img, imgName);
  };

  const handleLinkCopyClick = async () => {
    if (kakaoAlert()) return;
    copyUrl(location.href);
  };

  const handleKakaoShare = () => {
    if (isLoading) {
      alert('로딩 중입니다. 다시 시도해주세요. 🥰');
    } else {
      kakaoShare();
    }
  };

  const handleShare = async () => {
    if (kakaoAlert()) return;

    if (isChrome() && isOSX()) {
      alert(
        'macOS 환경의 크롬 브라우저에서는 지원하지 않는 기능입니다.\n다른 브라우저에서 실행해 주세요. 🥰'
      );
    } else {
      await webShare();
    }
  };

  return (
    <>
      <S.MenuContainer>
        <S.MenuItemWrapper>
          <S.MenuItemButton onClick={handleCapture}>
            <FontAwesomeIcon icon={faDownload} color={'white'} />
          </S.MenuItemButton>
          <S.MenuItemName>
            <FormattedMessage id="saveResult" />
          </S.MenuItemName>
        </S.MenuItemWrapper>

        <S.MenuItemWrapper>
          <S.MenuItemButton onClick={handleLinkCopyClick}>
            <FontAwesomeIcon icon={faLink} color={'white'} />
          </S.MenuItemButton>
          <S.MenuItemName>
            <FormattedMessage id="copyUrl" />
          </S.MenuItemName>
        </S.MenuItemWrapper>

        <S.MenuItemWrapper>
          <S.KakaoShareButton onClick={handleKakaoShare}>
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
          <S.MenuItemButton onClick={handleShare}>
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

export class ShareError extends CustomError {
  constructor(props: CustomErrorConstructor) {
    super(props);
    this.name = 'ShareError';
  }
}
export default ShareSubPage;
