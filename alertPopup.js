/* eslint-disable import/prefer-default-export */

/** * Constants ** */
import { PREFERNCECONST } from '../tickets/list/constants/preferencesConstant';



export const alertPopup = (state = {}, { type, data }) => {
  switch (type) {
    case PREFERNCECONST.PREFERENCESALERTPOPUPDATA:
    case 'TIMEENTRY_DELETE_OPEN_POPUP':
      return data;
    default:
      return state;
  }
};
