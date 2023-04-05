import { createReducer } from '../_utils/CommonUtils';

const displayHeader = (() => {
  function _createState(data) {
    return function() {
      return data;
    };
  }

  return createReducer(true, {
    'SHOW_TOPBAR': _createState(true),
    'HIDE_TOPBAR': _createState(false)
  });
})();

export default { displayHeader };
