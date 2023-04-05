import { userInfoConstants } from '../modules/tickets/list/constants/preferencesConstant';

const initialState = {
  disableTopBarLoading: false,
  disableUserInfoPopup: false,
  freezeLayerType: '',
  errorInfo: {},
  uiPreference: {
    isUIPreferenceShow: false,
    showBackButton: true,
    showPalette: true,
    showLeftPanelLightOption: true,
    subSection: ''
  }
};
function commonUIState(state = initialState, { type, data = {} }) {
  switch (type) {
    case 'DISABLE_TOPBAR_LOADING': {
      return { ...state, disableTopBarLoading: true };
    }
    case 'ENABLE_TOPBAR_LOADING': {
      return { ...state, disableTopBarLoading: false };
    }
    case 'DISABLE_USERINFO_POPUP': {
      return { ...state, disableUserInfoPopup: true };
    }
    case 'ENABLE_USERINFO_POPUP': {
      return { ...state, disableUserInfoPopup: false };
    }
    case 'FREEZE_LAYER_OPENED': {
      return { ...state, freezeLayerType: data.type };
    }
    case 'OPEN_USERPOPUP_CRMPLUS': {
      const uiPreference = {...state.uiPreference, ...data };
      return { ...state,  uiPreference }
    }
    case userInfoConstants.OPEN_UI_PREFERENCE:{
      const uiPreference = {...state.uiPreference, isUIPreferenceShow : true, ...data };
      return { ...state,  uiPreference }
    }
    case userInfoConstants.CLOSE_UI_PREFERENCE: {
      const uiPreference = {...state.uiPreference, isUIPreferenceShow : false, ...data };
      return { ...state,  uiPreference }
    }
    /* Error Handling UI State */
    case 'APP_ERROR': {
      return { ...state, errorInfo: data }
    }
    default: {
      return state;
    }
  }
}

export default { commonUIState };

