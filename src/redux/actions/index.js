import {DELETECARD} from './types';

export const deleteCard = id => {
  return {
    type: DELETECARD,
    payload: id,
  };
};
