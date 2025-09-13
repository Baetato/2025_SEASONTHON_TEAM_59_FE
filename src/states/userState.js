// 아직 적용전..!

import { atom } from 'recoil';

const defaultUser = {
  email: '',
  picture: '',
  nickname: '',
  level: 1,
  point: 0,
  socialType: '',
  isFirstLogin: false,
  isLocationAgreed: false,
  isCameraAccessAllowed: false,
  exp: 0,
};

// HMR 환경에서도 항상 atom을 유지
export const userState = (() => {
  if (window.__USER_STATE__ && window.__USER_STATE__._isRecoilAtom) {
    return window.__USER_STATE__;
  }
  const newAtom = atom({
    key: 'userState',
    default: defaultUser,
  });
  if (import.meta.hot) {
    window.__USER_STATE__ = newAtom;
  }
  return newAtom;
})();