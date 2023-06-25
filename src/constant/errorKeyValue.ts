export enum OmctErrorNo {
  /* 0 ~ 20 : Common Error */
  COMMON_ERROR_START = 0,
  COMMON_UNEXPECTED_CONDITION = COMMON_ERROR_START,
  COMMON_INVALID_PARAMETER,
  COMMON_ERROR_FINISH = 20,

  /* 21 ~ 30 : Share Error */
  SHARE_ERROR_START = COMMON_ERROR_FINISH,
  SHARE_CLIPBOARD_COPY_ERROR,
  SHARE_ERROR_FINISH = 30,
}

const omctError = new Map<OmctErrorNo, string>();

// prettier-ignore
/* 0 ~ 20 : Common Error */
omctError.set(OmctErrorNo.COMMON_UNEXPECTED_CONDITION, '예기치 못한 에러가 발생하였습니다.');
omctError.set(OmctErrorNo.COMMON_INVALID_PARAMETER, '잘못된 파라미터 입니다.');

// prettier-ignore
/* 21 ~ 30 : Share Error */
omctError.set(OmctErrorNo.SHARE_CLIPBOARD_COPY_ERROR, '클립보드 복사에 실패했습니다.');

export default omctError;
