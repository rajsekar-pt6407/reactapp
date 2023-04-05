import {
  LOAD_LOCALSTORAGE,
  SET_LOCALSTORAGE,
  REMOVE_LOCALSTORAGE_ITEM,
  REMOVE_LOCALSTORAGE
} from '@zohodesk/storage';

export const localStorages = (state = {}, { type, data } = {}) => {
  switch (type) {
    case LOAD_LOCALSTORAGE:
      return { ...data};
    case SET_LOCALSTORAGE:
      return { ...state, ...data};
    case REMOVE_LOCALSTORAGE_ITEM:
      return { ...state, ...data};
    case REMOVE_LOCALSTORAGE:
      return { ...data};
    default:
      return state;
  }
};
