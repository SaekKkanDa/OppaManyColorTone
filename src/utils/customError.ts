import omctError, { OmctErrorNo } from '@Constant/errorKeyValue';

export interface CustomErrorConstructor {
  errorNo: OmctErrorNo;
}

// HJ TODO: target es 모둘 업그레이드 후 cause 등록하게 수정
export default class CustomError extends Error {
  constructor({ errorNo }: CustomErrorConstructor) {
    super('CustomError');
    let msg = omctError.get(errorNo);

    if (!msg) {
      msg = '에러 부연 설명이 없습니다.';
    }

    this.message = msg;
  }
}

export class ShareError extends CustomError {
  constructor(props: CustomErrorConstructor) {
    super(props);
    this.name = 'ShareError';
  }
}
