/** ** Libraries *** */
import { combineReducers } from 'redux';
import selectn from 'selectn';

/** ** Reducers *** */
import setupUIState from '../modules/setup/reducers/UIState';
import displayHeader from '../modules/_reducers/headerUIState';
import {
  myFormUIState,
  singleUpdateState
} from '../submodules/all_forms/reducers/myForm';
import { sendAsEmailUIState } from '../modules/tickets/form/reducers/sendAsEmail';
import { formsRightPanel } from '../submodules/all_forms/reducers/formsRightPanel';
import commonUIState from './commonUIState';
import timezoneError from '../modules/agent/reducers/timezoneError'
/** * Constants ** */
import { constants } from '../modules/_constants';
import { SWITCH_AGENTS_VIEW } from '../modules/setup/constants/agents';
import { customLookup } from '../modules/customLookup/reducers/Customlookup'

const customViewInitialUIState = {
  accessibility: {
    roles: [],
    teams: [],
    rolesAndSubordinates: [],
    agents: []
  },
  criteria: {
    fieldConditions: [],
    pattern: '1'
  },
  name: '',
  department: ''
};

const customViewFormUIState = (
  state = customViewInitialUIState,
  { type, data } = {}
) => {
  switch (type) {
    case 'CV_ACCESSIBILITY_CHANGE':
      return { ...state, accessibility: data };
    case 'CV_DEPT_CHANGE':
      return { ...state, department: data };
    case 'CV_FILTERCRITERIA_ADD': {
      const { fieldConditions, pattern } = data;
      return {
        ...state,
        criteria: {
          ...state.criteria,
          fieldConditions: [...state.criteria.fieldConditions, fieldConditions],
          pattern
        }
      };
    }
    case 'CV_VIEWNAME_CHANGE':
      return { ...state, name: data };
    case 'CV_CRITERIAFIELD_CHANGE':
    case 'CV_CRITERIACONDITION_CHANGE':
    case 'CV_CRITERIAVALUE_CHANGE': {
      const { criteria, index } = data;
      const { fieldConditions: oldFieldConditions } = state.criteria;
      const newFieldConditions = [...oldFieldConditions];
      newFieldConditions[index] = criteria;
      return {
        ...state,
        criteria: { ...state.criteria, fieldConditions: newFieldConditions }
      };
    }
    case 'CLEAR_CRITERIA':
      return {
        ...customViewInitialUIState,
        criteria: { ...customViewInitialUIState.criteria },
        accessibility: { ...customViewInitialUIState.accessibility }
      };
    case 'CV_SET_INITIAL_STATE':
      return data;
    case 'CV_FILTERCRITERIA_REMOVE': {
      const { fieldConditions: oldFieldConditions } = state.criteria;
      const { index: removeIndex, pattern } = data;
      const newFieldConditions = oldFieldConditions.filter(
        (condition, index) => index !== removeIndex
      );
      return {
        ...state,
        criteria: {
          ...state.criteria,
          fieldConditions: newFieldConditions,
          pattern
        }
      };
    }
    case 'CV_PATTERN_CHANGE':
      return { ...state, criteria: { ...state.criteria, pattern: data } };
    default:
      return state;
  }
};

const layoutState = (state = {}, { type, data } = {}) => {
  switch (type) {
    case 'LEFT_LAYOUT_CHANGE':
      return data;
    case 'FETCH_BRANDS_SUCCESS':
      return { showLeftMenu: data.showLeftMenu };
    default:
      return state;
  }
};

const isListViewEnabled = (state = false, { type, data }) => {
  switch (type) {
    case SWITCH_AGENTS_VIEW:
      return data.isEnabled;
    default:
      return state;
  }
};

const peekState = (state = {}, { type, data }) => {
  switch (type) {
    case 'OPEN_PEEK_VIEW':
      return { ...state, ...data };
    case 'CLOSE_PEEK_VIEW':
      return {};
    case 'CLOSE_EDITOR_STATE':
      return { ...state, needToOpenEditor: false };
    case 'CLOSE_COMMENT_STATE':
      return { ...state, needToOpenComment: false };
    case 'CLEAR_NAVIGATION_STATE':
      const newState = {...state};
      delete newState.navigationObj;
      return newState;
    case 'MODULES_CREATE_SUCCESS':
      if(data.batchObjArr){
        const { batchObjArr=[] } = data || {};
        if ((batchObjArr[0] || {}).method === 'POST') {
          const newStateModuleCreate = {...state};
          delete newStateModuleCreate.navigationObj;
          return newStateModuleCreate;
        }
      }
      return state;
    default:
      return state;
  }
};

const customerUIState = (state = {}, { type, data }) => {
  switch (type) {
    case 'CUSTOMER_TICKET_SUCCESS':
      const ticketSubtab = {
        from: data.from,
        limit: data.limit,
        noMoreData: data.noMoreData,
        filter: data.statusType,
        module: data.moduleSingular,
        isEmpty: data.isEmpty
      };
      return { ...state, ticketSubtab };
    default:
      return state;
  }
};

const activitySubtabUIState = (state = {}, { type, data }) => {
  switch (type) {
    case 'activitySubtabFilter':
      return { ...state, ...data };
    default:
      return state;
  }
};

const audioPlayerState = { currentplayerId: null };
const audioPlayer = (state = {}, { type, data }) => {
  switch (type) {
    case 'UPDATE_AUDIO_PLAYER':
      return { ...state, currentplayerId: data };
    default:
      // return Object.assign({}, state, { currentplayerId: null });
      return audioPlayerState;
  }
};

const agents = combineReducers({
  isListViewEnabled
});

const listFilterUIState = (state = {}, { type, data }) => {
  switch (type) {
    case 'TOGGLE_LIST_FILTER': {
      if (data.reset) {
        return {};
      }
      if (data.toggle) {
        const oldState = selectn(`${data.module}`, state) || false;
        return { ...state, [data.module]: !oldState };
      }
      // { tickets: true, activities: true }
      return { ...state, [data.module]: data.isFilterOpen };
    }
    default: {
      return state;
    }
  }
};

const isModuleLeftPanelOpen = (state = false, { type }) => {
  switch (type){
    case 'SHOW_MODULE_LEFTPANEL':
      return true;
    case 'HIDE_MODULE_LEFTPANEL':
      return false;
    default:
      return state;
  }
}

const projectState = {
  enabledDepIds: [],
  notEnbaledDepIds: [],
  status: 'statusNotUpdated'
};
const projectsList = (state = projectState, { type, data }) => {
  switch (type) {
    case 'PROJECT_LIST_SUCCESS':
      return { ...state, list: data };
    case 'TASK_PROJECT_CREATE':
      return { ...state, ...data };
    case 'IS_PROJECT_ENABLED_SUCCESS':
      return {
        ...state,
        enabledDepIds: data.enabledDepIds,
        notEnbaledDepIds: data.notEnbaledDepIds,
        status: data.status
      };
    default:
      return state;
  }
};

function externalContainer(state = { name: null, props: null }, action) {
  switch (action.type) {
    case 'RENDER_CONTAINER':
      return action.data;
    default:
      return state;
  }
}

export const refreshBannerData = (state = {}, { type, data }) => {
  switch (type) {
    case constants.SHOW_REFRESH_BANNER:
      return { ...state, data, showMessage: true };

    case constants.HIDE_REFRESH_BANNER:
      return { ...state, showMessage: false };

    default:
      return state;
  }
};

const initialFeedBackFormState = {
  isScriptDownloaded: false,
  isScriptDownloading: false,
  isWMS_FBFormLoaded: false,
  status: false
};

export const feedBackForm = (
  state = initialFeedBackFormState,
  { type, data }
) => {
  switch (type) {
    case 'FEEDBACK_FORM_SCRIPT_FETCHED':
      return { ...state, isScriptDownloaded: data, isScriptDownloading: false };

    case 'FEEDBACK_FORM_SCRIPT_FETCHING':
      return { ...state, isScriptDownloading: data };

    case 'FEEDBACK_FORM_OPEN':
      return { ...state, status: data.status,type: data.type, params: data.params  };  
      
    case 'FEEDBACK_FORM_CLOSE':
      return  { ...state, status: false,type: "", params: {}  };  

    default:
      return state;
  }
};

const UIState = combineReducers({
  customViewFormUIState,
  layoutState,
  agents,
  peekState,
  customerUIState,
  singleUpdateState,
  activitySubtabUIState,
  listFilterUIState,
  audioPlayer,
  formsRightPanel,
  externalContainer,
  projectsList,
  refreshBannerData,
  ...setupUIState,
  ...myFormUIState,
  ...sendAsEmailUIState,
  ...displayHeader,
  ...commonUIState,
  feedBackForm,
  timezoneError,
  isModuleLeftPanelOpen,
  customLookup
});
export default UIState;
