/* eslint-disable no-fallthrough */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable func-names */

/** * Libraries ** */
import selectn from 'selectn';
import { combineReducers } from 'redux';
import { URL_CHANGE } from '@zohodesk/router-middleware';

/** * Methods ** */
import { departmentSpecificState } from './departmentSpecificState';
import { themeReducer } from './themeReducer';
import { queueView } from '../modules/tickets/queue/reducers/queueView';
import { globalSearch } from '../modules/search/reducers/globalSearch';
import UIState from './UIState';
import { rolesList } from '../modules/setup/reducers/roles';
import { teamsList } from '../modules/setup/agents/reducers/agent';
import { alertPopup } from '../modules/_reducers/alertPopup';
import { accountSlaFormInfo } from '../modules/customers/accounts/detail/selectors/accountSlaForm';
import navigationHandler from '../library/navigationHandler/navigationHandlerReducer';
import setupReducers from '../modules/setup/reducers';
import {
  dependencyMapping,
  myForm
} from '../submodules/all_forms/reducers/myForm';
import { moduleComments } from '../submodules/comments/reducers/moduleComments';
import { ticketConversation } from '../modules/tickets/detail/reducers/ticketConversation';
import {
  socialData,
  getBrands,
  getFacebookObj,
  getInstagramObj,
  getTwitterObj,
  getMessagesData,
  getBrandStats,
  getAuthors,
  setSocialStatus,
  setSocialCursor,
  setSocialNftnData,
  setSocialRealTimeNftn
} from '../modules/social/reducers';
import { chatNftnData, chatInitData } from '../modules/chat/reducers';
import {
  accountLookup,
  contactLookup,
  productLookup,
  ticketLookup,
  twitterLookup
} from '../modules/_reducers/lookup';
import { ticketTemplate } from '../modules/tickets/detail/reducers/ticketTemplate';
import duplicates from '../modules/customers/_reducers/DeDuplication';
import { channelPreferences } from '../modules/topbar/userinfo/reducers/channelPreferences';
import { myActiveTimers } from '../submodules/timeentry/reducers/myActiveTimers';
import { localStorages } from './localStorage';
import { installedExtensions } from '../modules/marketplace/redcuers/installedExtensions';
import { widgets } from '../modules/marketplace/redcuers/widgets';
import marketplace from '../modules/marketplace/redcuers/marketplace';
import { Timer } from '../submodules/timeentry/reducers/Timer';
import { timeEntryUIState } from '../submodules/timeentry/reducers/timeEntryReducer';
import {
  myLayouts,
  allLayouts
} from '../submodules/all_forms/reducers/myLayouts';
import { skills } from '../submodules/skills/reducers/skillsReducer';
import {
  gamificationNotification,
  gamificationParams,
  gamificationBadges
} from '../modules/topbar/gamification/reducers/GamificationReducer';
import { imState } from '../modules/IM/reducers/imReducer';
import { microsoftInfo } from '../submodules/Office365/reducers/microsoftInfoReducer';
import { syncExtensionsInfo } from "../submodules/syncframework/reducers/syncReducers";
import { businessHours } from '../modules/_reducers/businessHours';
import { lensInfo } from '../submodules/lens/reducers/lensReducer';
// import omit from 'lodash/object/omit';
import {
  createFilteredReducer,
  arraySet,
  setCollisionReplyingAtTop
} from '../modules/_utils/CommonUtils';
import { contactFeaturePermissions } from '../modules/customers/contacts/detail/reducers/index';

/** * Constants ** */

import {
  moduleConst,
  SCREEN,
  ANALYTICS_INTEGRATION,
  ANALYTICS_CONFIG,
  constants
} from '../modules/_constants/index';
import { moduleConst as mpModuleConst } from '../modules/marketplace/constants/MPConstants';
import * as taskVar from '../modules/activities/task/list/constants/taskConstants';
import { TICKETSVIEW } from '../modules/tickets/list/constants/preferencesConstant';
import customModule from '../modules/customLookup/subtab/reducers';
import onboardingStatus from '../submodules/onboarding/reducers';

import { customPredictors } from './customPredictorsState';

// TIMETRACK constant
// import {
//   TIMETRACK_CHANGEVIEW,
//   TIMETRACK_SAVE_REQUEST
// } from '../constants/setup/TimeTrackConstants';
// import { _SUCCESS } from '../constants/setup/labels';

const tabs = (state = [], { type, data }) => {
  switch (type) {
    case 'MODULEMETA_SUCCESS':
      return data.result;

    default:
  }
  return state;
};

const loader = (state = false, action) => {
  const { SHOW_LOADER, HIDE_LOADER } = constants;
  switch (action.type) {
    case SHOW_LOADER:
      return true;
    case HIDE_LOADER:
      return false;
    default:
      return state;
  }
};

export const contactUIState = (state = {}, { type, data }) => {
  switch (type) {
    case 'INITIALIZE_CONTACT_UI_STATE':
      return { ...state, ...data };
    case 'CLOSE_CONTACT_DETAIL':
      return {};
    default:
      return state;
  }
};

export const accountUIState = (state = {}, { type, data }) => {
  switch (type) {
    case 'INITIALIZE_ACCOUNT_UI_STATE':
      return { ...state, ...data };
    case 'CLOSE_ACCOUNT_DETAIL':
      return {};
    default:
      return state;
  }
};

const i18n = function (state = {}) {
  return state;
};
// OnboardingStatus.STAT
// const onboardingStatus = function (state = {}, { type, data }) {
//   switch (type) {
//     case 'LOAD_ONBOARDSTATUS_SUCCESS':
//     case 'ONBOARDING_COMPLETE_SUCCESS':
//       return data;
//     default:
//       return state;
//   }
// };
const isPageLoaded = function (state = false, { type, data }) {
  switch (type) {
    case URL_CHANGE:
      return false;
    case 'SET_PAGELOADSTATUS':
      return data;
    default:
      return state;
  }
};

const isChatWithUsEnabled = function (state = false, { type, data }) {
  switch (type) {
    case 'TOGGLE_CHAT_WITH_US':
      return data;
    default:
      return state;
  }
};

const dcProperties = function (state = {}, { type, data }) {
  if (type === 'GET_DC_URLS_SUCCESS') {
    const newState = { ...state, ...data };
    return newState;
  }
  return state;
};

// const dashboard = function(state, { action }) {
//   switch (type) {
//   case 'TICKET_UPDATE':
//     return;

//   default:
//   }
//   return state;
// };

const queue = queueView;

export const commentHistoryInfo = (state = {}, { type, data }) => {
  switch (type) {
    case 'SHOW_COMMENTHISTORY':
      return data;

    case 'HIDE_COMMENTHISTORY':
      return [];

    default:
  }
  return state;
};

const mergeInfo = (state = {}, { type, data }) => {
  switch (type) {
    case 'UPDATE_MERGE_ID': {
      let newUpdateMergeState = { ...state };
      newUpdateMergeState = data.checkedModuleList;
      return {
        mergeIds: newUpdateMergeState,
        pageInfo: data.pageInfo,
        curModName: data.curModName,
        mergeModuleName: data.mergeModuleName,
        selectedDepartment: data.selectedDepartment,
        needMergeDetailsAfterMerge: data.needMergeDetailsAfterMerge
      };
    }
    // case 'MERGE_RECORDS_SUCCESS':
    case 'CLEAR_MERGE_ID': {
      return data;
    }
    default:
  }
  return state;
};

const lookUpContainer = (state = '', { type, data }) => {
  switch (type) {
    case 'CLEAR_MERGE_ID':
    case 'HIDE_COMMENTHISTORY':
    case 'FREEZE_DISABLE':
      return '';
    case 'LOOKUP_OPEN':
      return data;

    default:
  }
  return state;
};

const currentTrialEdition = (state = null, { type, data }) => {
  if (type === 'ENABLE_TRIAL_SUCCESS') {
    return data;
  }
  return state;
};

const isFeedBackFormOpen = (state = false, { type }) => {
  switch (type) {
    case 'OPEN_FEEDBACKFORM':
      return true;
    case 'CLOSE_FEEDBACKFORM':
      return false;
    default:
  }
  return state;
};
const isCloudAttchOpen = (state = false, { type }) => {
  switch (type) {
    case 'OPEN_CLOUD_ATTACH':
      return true;
    case 'CLOSE_CLOUD_ATTACH':
      return false;
    case '@@router/URL_CHANGE':
      return false;
    default:
  }
  return state;
};

export const sharedDepartmentAgentIds = (state = [], { type, data } = {}) => {
  switch (type) {
    case 'SHARED_DEPARTMENT_AGENTS_SUCCESS': {
      return data.from === 1
        ? data.result
        : [...new Set([...state, ...data.result])];
    }
    default:
      return state;
  }
};

export const customChannelsInfo = (state = {}, { type, data } = {}) => {
  switch (type) {
    case 'CUSTOM_CHANNEL_INFO_SUCCESS': {
      return data;
    }
    default:
      return state;
  }
};

export const requestFlags = (state = {}, { type, data } = {}) => {
  switch (type) {
    case 'REQUEST_FLAGS_SUCCESS': {
      return { ...state, ...data.data };
    }
    default:
      return state;
  }
};

export const freezeLayer = (state = false, { type }) => {
  switch (type) {
    case 'NOTIFICATION_ENABLE':
    case 'FREEZE_SHOW':
    case 'ALERT_SHOW':
      //  case 'OPEN_USER_INFO':
      return true;

    case 'LOOKUP_OPEN':
      return true;

    case 'CLEAR_MERGE_ID':
    case 'HIDE_COMMENTHISTORY':
    case 'FREEZE_DISABLE':
    case 'ALERT_HIDE':
    case 'NOTIFICATION_DISABLE':
      //    case 'CLOSE_USER_INFO':
      return false;

    default:
  }
  return state;
};

export const previewObj = (state = {}, { type, data }) => {
  switch (type) {
    case 'ATTACHMENTVIEWR_ENABLE':
      return data;

    case 'ATTACHMENTVIEWR_DISABLE':
      return [];

    default:
  }
  return state;
};

export const messageData = (state = {}, { type, data }) => {
  switch (type) {
    case 'MESSAGE_SHOW':
      return { ...state, data, showMessage: true };

    case 'MESSAGE_HIDE':
      return { ...state, showMessage: false };

    default:
      return state;
  }
};

export const ticketDVNotificationData = (state = {}, { type, data }) => {
  switch (type) {
    case 'SHOW_TICKET_DV_NOTIFICATION':
      return { ...state, data, showNotification: true };

    case 'HIDE_TICKET_DV_NOTIFICATION':
      return { ...state, showNotification: false };
    default:
      return state;
  }
};

export const shortcutData = (state = {}, { type, data }) => {
  switch (type) {
    case 'SHORTCUT_SHOW':
      return { ...state, data, showShortcut: true };

    case 'SHORTCUT_HIDE':
      return { ...state, showShortcut: false };

    default:
      return state;
  }
};

export const alertData = (state = {}, { type, data }) => {
  switch (type) {
    case 'ALERT_SHOW':
      return data;
    case 'ALERT_HIDE':
      return {};

    default:
  }
  return state;
};

export const realTimeConfirmAlert = (state = {}, { type, data }) => {
  switch (type) {
    case 'SHOW_REALTIMECONFIRM_ALERT':
      return data;
    case 'HIDE_REALTIMECONFIRM_ALERT':
      return {};
    default:
  }
  return state;
};

export const ajaxLoadingCount = (state = 0, { type }) => {
  if (type.endsWith('_REQUEST')) {
    return state + 1;
  }
  if (type.endsWith('_SUCCESS') || type.endsWith('_FAILURE')) {
    return state > 0 ? state - 1 : state;
  }
  if (type === 'CLEAR_LOADING') {
    return 0;
  }

  return state;
};

// const selectedOrg = (state = null, { type, data } = {}) => state;

export const entity = (module) => (state = {}, { type, data = {} } = {}) => {
  const moduleL = module && module.toLowerCase();
  if (type === 'TICKET_THREAD_DELETE_SUCCESS') {
    const { ticketId, threadId } = data;
    if (moduleL === 'ticket' && data.threadId) {
      let newState = { ...state };
      const ticketData = { ...newState[ticketId] };
      if (ticketData.conversationIds) {
        const oldList = ticketData.conversationIds;
        ticketData.conversationIds = oldList.filter(
          (item) => threadId !== item.id
        );
        newState = { ...newState, [ticketId]: ticketData };
      }
      if (ticketData.thread) {
        const oldList = ticketData.thread;
        ticketData.thread = oldList.filter((item) => threadId !== item);
        newState = { ...newState, [ticketId]: ticketData };
      }
      return newState;
    }
  } else if (
    module === moduleConst.ORGANIZATION &&
    type === 'CHANGE_DEFAULTPORTAL_SUCCESS'
  ) {
    const newState = Object.keys(state).reduce((acc, orgId) => {
      const org = state[orgId];
      if (orgId === data.id) {
        org.isDefault = true;
      } else {
        org.isDefault = false;
      }
      return Object.assign(acc, { [orgId]: { ...org } });
    }, {});
    return newState;
  } else if (
    type.endsWith('_COMMENT_SUCCESS') &&
    data &&
    data.entities &&
    data.entities[moduleL] &&
    data.module === moduleL
  ) {
    return moduleComments(state, { type, module, data });
  } else if (
    moduleL !== 'comment' &&
    moduleL !== 'agent' &&
    type.endsWith('_CONVERSATION_SUCCESS') &&
    data &&
    data.entities &&
    data.entities[moduleL]
  ) {
    return ticketConversation(state, { type, module, data });
  } else if (type === 'CONTACT_PHOTO_DELETE_SUCCESS' && moduleL === 'contact') {
    const { id } = data;
    const newState = { ...state };
    const contactData = newState[id];
    contactData.photoURL = null;
    return newState;
  } else if (type.endsWith('_DELETE_SUCCESS')) {
    const { parentModule } = data;
    const { parentEntityId } = data;
    const entityModule = data.module;
    const entityId = data.id;

    if (parentModule === moduleL || entityModule === moduleL) {
      let newState = { ...state };
      if (parentModule === moduleL) {
        const prevEntityIds = newState[parentEntityId][entityModule];
        newState[parentEntityId][entityModule] = prevEntityIds.filter(
          (item) => {
            if (typeof item === 'object') {
              return entityId !== item.id;
            }
            return entityId !== item;
          }
        );
      }

      if (type === `${module}_DELETE_SUCCESS` || entityModule === moduleL) {
        newState = Object.keys(newState).reduce((res, id) => {
          if (
            (Array.isArray(entityId) && entityId.indexOf(id) < 0) ||
            (!Array.isArray(entityId) && id !== entityId)
          ) {
            res[id] = newState[id];
          }
          return res;
        }, {});
      }

      return newState;
    }
  } else if (type === 'UNARCHIVED_VIEW_SUCCESS') {
    const cloneView = { ...state[data.viewId] };
    delete cloneView.archivedTime;
    delete cloneView.deleteInDays;
    /* Object.keys(cloneView).filter(key => {
      return key !== 'archivedTime' && key !== 'deleteInDays';
    }); */
    const newState = { ...state, [data.viewId]: cloneView };
    return newState;
  } else if (
    type.endsWith('_CREATE_SUCCESS') &&
    type !== 'MODULES_CREATE_SUCCESS'
  ) {
    const { module, id, res } = data;
    if (module === moduleL) {
      return { ...state, [id]: res };
    }
  } else if (type.endsWith('_UPDATE_SUCCESS')) {
    const entityModule = data.module;
    const entityId = data.id;
    if (entityModule === moduleL) {
      let newState = { ...state };
      if (entityModule === 'attachment') {
        // newState[entityId].isPublic = data.isPublic;
        newState = {
          ...newState,
          [entityId]: { ...newState[entityId], isPublic: data.isPublic }
        };
      } else {
        if (Array.isArray(entityId)) {
          const updatedState = entityId.reduce((res, id) => {
            res[id] = { ...newState[id], ...data.res };
            return res;
          }, {});
          return { ...newState, ...updatedState };
        }
        return {
          ...newState,
          [entityId]: { ...newState[entityId], ...data.res }
        };

        // newState[entityId] = data.res;
      }
      return newState;
    }
  } else if (type.startsWith('CUSTOMERHAPPINESS')) {
    const { moduleId, noMoreData = false } = data;
    if (state[moduleId]) {
      const newState = { ...state };
      const newStateModuleId = { ...newState[moduleId] };
      newStateModuleId.happinessRating = {
        ...newStateModuleId.happinessRating
      };
      if (type.endsWith('RATING_SUCCESS')) {
        newStateModuleId.happinessRating.rating = data;
      } else if (type.endsWith('COUNT_SUCCESS')) {
        newStateModuleId.happinessRating.count = data;
      } else if (type.endsWith('LABEL_SUCCESS')) {
        newStateModuleId.happinessRating.label = data;
      }
      newStateModuleId.happinessRating = {
        ...newStateModuleId.happinessRating,
        moduleId,
        noMoreData
      };
      return { ...newState, [moduleId]: newStateModuleId };
    }
    return state;
  } else if (type === 'ADD_AS_END_USER_SUCCESS' && moduleL === 'contact') {
    const { id } = data;
    const newState = { ...state };
    if (Array.isArray(id)) {
      const changedState = id.reduce((res, id) => {
        res[id] = { ...newState[id], isInvited: true };
        return res;
      }, {});
      return { ...newState, ...changedState };
    }
    return { ...newState, [id]: { ...newState[id], isInvited: true } };
  } else if (type === 'CONTACT_HELPCENTER_SUCCESS' && moduleL === 'contact') {
    const { resData, id } = data;
    const newState = { ...state };
    const portalObj = resData.reduce(
      (obj, { helpCenter, userId }) =>
        Object.assign(obj, {
          [helpCenter.id]: {
            name: helpCenter.name,
            url: helpCenter.url,
            status: helpCenter.status,
            userId
          }
        }),
      {}
    );
    let endUserId = '';
    let isInvited = false;
    let isUserActive = false;
    let waitingForApprovalIds = [];
    const hasEmailId = selectn(`${[id]}.email`, newState);
    for (const helpCenter of resData) {
      if (
        helpCenter.userStatus === 'ACTIVE' ||
        helpCenter.userStatus === 'DISABLED'
      ) {
        if(!endUserId) {
          isUserActive = helpCenter.userStatus === 'ACTIVE';
          endUserId = helpCenter.userId;
        }
      }
      if(
        helpCenter.userStatus === 'WAITING_FOR_APPROVAL' && 
        hasEmailId
      ) {
        waitingForApprovalIds.push(helpCenter.helpCenter.id);
      }
      if (
        helpCenter.userStatus === 'REINVITED' ||
        helpCenter.userStatus === 'INVITED' ||
        helpCenter.userStatus === 'WAITING_FOR_APPROVAL'
      ) {
        if(!endUserId) {
          isInvited = true;
        }
      }
    }
    return {
      ...newState,
      [id]: {
        ...newState[id],
        isInvited,
        isUserActive,
        endUserId,
        waitingForApprovalIds,
        portals: portalObj
      }
    };
  } else if (
    type === 'UPDATE_ENDUSER_DETAILS_SUCCESS' &&
    moduleL === 'contact'
  ) {
    const newState = { ...state };
    const { resData, id } = data;
    const isUserActive = resData.status === 'ACTIVE';
    return { ...newState, [id]: { ...newState[id], isUserActive } };
  } else if (type === 'FILTER_PENDINGAPPROVALS' && moduleL === 'ticket') {
    let newState = { ...state };
    const { ticketId, approvalId } = data;
    const ticketData = { ...newState[ticketId] };
    if (ticketData.approvalIds) {
      const oldList = ticketData.approvalIds;
      ticketData.approvalIds = oldList.filter((id) => approvalId !== id);
      newState = { ...newState, [ticketId]: ticketData };
    }
    return newState;
  } else if (
    type.endsWith('_SUCCESS') &&
    data &&
    data.entities &&
    data.entities[module.toLowerCase()]
  ) {
    const newState = { ...state };
    return Object.keys(data.entities[module.toLowerCase()]).reduce(
      (res, nextKey) => {
        const newObj = {
          ...state[nextKey],
          ...data.entities[module.toLowerCase()][nextKey]
        };
        return { ...res, [nextKey]: newObj };
      },
      newState
    );

    // return Object.assign({}, state, data.entities[module.toLowerCase()]);
  } else if (
    type === 'REMOVE_TICKET_FROM_CUSTOMER' &&
    moduleL === data.module
  ) {
    const { id, ticketId } = data;
    const newState = { ...state };
    let customerInfo = newState[id];
    if (customerInfo.ticket) {
      const tickets = customerInfo.ticket.filter((value) => value !== ticketId);
      customerInfo = { ...customerInfo, ticket: tickets };
    }
    return { ...newState, [id]: customerInfo };
  } else if (type === 'UPDATE_RESOLUTION_SUCCESS') {
    const { content, id } = data;
    const newState = { ...state };
    return { ...newState, [id]: { ...newState[id], resolution: content } };
  }
  // switch (type) {
  //   case module + '_SUCCESS':
  //     return data.entities[module.toLowerCase()];
  // }
  return state;
};
// const order = module => (state = [], { type, data }) => {
//   switch (type) {
//     case module + '_SUCCESS':
//       if (data.result instanceof Array) {
//         return data.result;
//       }
//   }
//
//   return state;
// };

/* need to re-structor - department list - setup page @vimal */
const departmentList = (state = [], { type, data }) => {
  switch (type) {
    case 'DEPARTMENT_SUCCESS': {
      const { from, limit, result, isNext } = data;
      const updatedFrom = from - 1;
      const doubleLimit = limit * 2 > 200 ? 200 : limit * 2;
      const to = updatedFrom + doubleLimit;
      let newList = arraySet(state.slice(0, updatedFrom), result);
      newList = isNext
        ? arraySet(newList, state.slice(to, state.length))
        : newList;
      return newList;
    }

    default:
      return state;
  }
};
export const activeAgents = (state = [], { type, data }) => {
  switch (type) {
    case 'AGENT_SUCCESS':
    /* if (data.result instanceof Array) {
        let newState = Object.assign({}, state);
        let { depId } = data;
        if (!state[depId]) {
          newState[depId] = data.result;
        } else {
          newState[depId] = [...new Set([...newState[depId], ...data.result])];
        }
        return newState;
      }
      return state; */
    case 'AGENT_SEARCH_SUCCESS': {
      if (data.result instanceof Array && (typeof data.needStoreUpdate !== 'boolean' || data.needStoreUpdate)) {
        const { depId } = data;
        const newState = { ...state, [depId]: data.result };
        return newState;
      }
      return state;
    }
    case 'AGENT_NEXT_SUCCESS': {
      const newState = { ...state };
      const { depId } = data;
      if (!state[depId]) {
        newState[depId] = data.result;
      } else {
        newState[depId] = [...new Set([...newState[depId], ...data.result])];
      }
      return newState;
    }
    case 'MULTI_DEPT_AGENT_SUCCESS': {
      if (typeof data.needStoreUpdate !== 'boolean' || data.needStoreUpdate) {
        const newState = { ...state };
        const { depId = '', entities, result = [] } = data;
        const { agent = {}, agentMentionSearch = {} } = entities;
        const deptIds = (depId && depId.split(',')) || [];
        deptIds.map((deptId) => {
          result.map((agentId) => {
            const currentAgent = agent[agentId] || agentMentionSearch[agentId];
            if (currentAgent.associatedDepartmentIds.indexOf(deptId) != -1) {
              if (!newState[deptId]) {
                newState[deptId] = [agentId];
              } else if (newState[deptId].indexOf(agentId) == -1) {
                newState[deptId] = [...newState[deptId], agentId];
              }
            }
          });
        });
        return newState;
      }
      return state;
    }
    default:
      return state;
  }
};

const agentStatus = (status) => (state = [], { type, data }) => {
  switch (type) {
    case 'AGENT_SUCCESS':
      if (data.status === status) {
        return data.result;
      }
      return state;
    default:
      return state;
  }
};

// const availableChannel = status => (state = [], { type, data }) => {
//   switch (type) {
//   case 'ONLINE_AGENTS_SUCCESS':
//     if (data.data.Ch === status) {
//       return data.data;
//     }
//     return state;
//   default:
//     return state;
//   }
// };

const orgFields = (
  state = {},
  { type , data = {} } = {}
) => {
  const { fieldMapper , moduleName } = data;
  switch (type) {
    case 'ORGANIZATION_FIELDS_SUCCESS':
      return { ...state, [moduleName] : { fieldMapper } }; //API name mapped with fieldIds
    default:
      return state;
  }
}

const modules = combineReducers({
  [moduleConst.ORGANIZATION_L]: entity(moduleConst.ORGANIZATION),
  [moduleConst.TICKET_L]: entity(moduleConst.TICKET),
  [moduleConst.DEPARTMENT_L]: entity(moduleConst.DEPARTMENT),
  [moduleConst.PROFILE_L]: entity(moduleConst.PROFILE),
  [moduleConst.CONTACT_L]: entity(moduleConst.CONTACT),
  [moduleConst.ACCOUNT_L]: entity(moduleConst.ACCOUNT),
  [moduleConst.AGENT_L]: entity(moduleConst.AGENT),
  [moduleConst.PRODUCT_L]: entity(moduleConst.PRODUCT),
  [moduleConst.TEAMS_L]: entity(moduleConst.TEAMS),
  [moduleConst.LAYOUT_L]: entity(moduleConst.LAYOUT),
  [moduleConst.SECTION_L]: entity(moduleConst.SECTION),
  [moduleConst.FIELD_L]: entity(moduleConst.FIELD),
  [moduleConst.ATTACHMENT_L]: entity(moduleConst.ATTACHMENT),
  [moduleConst.TASK_L]: entity(moduleConst.TASK),
  [moduleConst.EVENT_L]: entity(moduleConst.EVENT),
  [moduleConst.CALL_L]: entity(moduleConst.CALL),
  [moduleConst.ACTIVITIES_L]: entity(moduleConst.ACTIVITIES),
  [moduleConst.TIMEENTRY_L]: entity(moduleConst.TIMEENTRY),
  [moduleConst.THREAD_L]: entity(moduleConst.THREAD),
  [moduleConst.APPROVAL_L]: entity(moduleConst.APPROVAL),
  [moduleConst.COMMENT_L]: entity(moduleConst.COMMENT),
  [moduleConst.TICKETVIEW_L]: entity(moduleConst.TICKETVIEW),
  [moduleConst.TASKVIEW_L]: entity(moduleConst.TASKVIEW),
  [moduleConst.CALLVIEW_L]: entity(moduleConst.CALLVIEW),
  [moduleConst.EVENTVIEW_L]: entity(moduleConst.EVENTVIEW),
  [moduleConst.ACTIVITIESVIEW_L]: entity(moduleConst.ACTIVITIESVIEW),
  [moduleConst.ARTICLE_L]: entity(moduleConst.ARTICLE),
  [moduleConst.CATEGORY_L]: entity(moduleConst.CATEGORY),
  [moduleConst.COMMUNITY_L]: entity(moduleConst.COMMUNITY),
  [moduleConst.CONTRACT_L]: entity(moduleConst.CONTRACT),
  [moduleConst.CONTRACTVIEW_L]: entity(moduleConst.CONTRACTVIEW), 
  [moduleConst.ACCOUNTVIEW_L]: entity(moduleConst.ACCOUNTVIEW),
  [moduleConst.CONTACTVIEW_L]: entity(moduleConst.CONTACTVIEW),
  [moduleConst.CUSTOMVIEW_L]: entity(moduleConst.CUSTOMVIEW_L),
  [moduleConst.ROLE_L]: entity(moduleConst.ROLE),
  [moduleConst.TAG_L]: entity(moduleConst.TAG),
  [moduleConst.SNIPPET_L]: entity(moduleConst.SNIPPET),
  [mpModuleConst.WIDGETS_L]: widgets,
  [mpModuleConst.INSTALLED_EXTENSIONS_L]: installedExtensions,
  [moduleConst.MACROS_L]: entity(moduleConst.MACROS),
  [moduleConst.FEEDS_L]: entity(moduleConst.FEEDS),
  [moduleConst.FEED_LATEST_THREAD]: entity(moduleConst.FEED_LATEST_THREAD),
  [moduleConst.CUSTOMERHAPPINESSRATING_L]: entity(
    moduleConst.CUSTOMERHAPPINESSRATING
  ),
  [moduleConst.AUTOMATIONALERTS_L]: entity(moduleConst.AUTOMATIONALERTS),
  [moduleConst.AUTOMATIONTASKS_L]: entity(moduleConst.AUTOMATIONTASKS),
  [moduleConst.AUTOMATIONFIELDUPDATES_L]: entity(
    moduleConst.AUTOMATIONFIELDUPDATES
  ),
  [moduleConst.AUTOMATIONFIELDSTOUPDATE_L]: entity(
    moduleConst.AUTOMATIONFIELDSTOUPDATE
  ),
  [moduleConst.EMAILTEMPLATES_L]: entity(moduleConst.EMAILTEMPLATES),
  [moduleConst.BRANDS_L]: entity(moduleConst.BRANDS_L),
  [moduleConst.FACEBOOK_L]: entity(moduleConst.FACEBOOK_L),
  [moduleConst.INSTAGRAM_L]: entity(moduleConst.INSTAGRAM_L),
  [moduleConst.TWITTER_L]: entity(moduleConst.TWITTER_L),
  [moduleConst.POSTS_L]: entity(moduleConst.POSTS_L),
  [moduleConst.INSTAPOSTS_L]: entity(moduleConst.INSTAPOSTS_L),
  [moduleConst.TWEETS_L]: entity(moduleConst.TWEETS_L),
  [moduleConst.FBCOMMENTS_L]: entity(moduleConst.FBCOMMENTS),
  [moduleConst.CONVERSATIONS_L]: entity(moduleConst.CONVERSATIONS_L),
  [moduleConst.MESSAGES_L]: entity(moduleConst.MESSAGES_L),
  [moduleConst.SLA_L]: entity(moduleConst.SLA_L),
  [moduleConst.TICKET_TEMPLATE_L]: entity(moduleConst.TICKET_TEMPLATE),
  [moduleConst.HELPCENTER_L]: entity(moduleConst.HELPCENTER_L),
  [moduleConst.PORTAL_USER]: entity(moduleConst.PORTAL_USER),
  [moduleConst.TICKET_MENTION]: entity(moduleConst.TICKET_MENTION),
  [moduleConst.ACTIVITY_MENTION]: entity(moduleConst.ACTIVITY_MENTION),
  [moduleConst.SNIPPET_PLACEHOLDERS]: entity(moduleConst.SNIPPET_PLACEHOLDERS),
  [moduleConst.CRM_CONTACT]: entity(moduleConst.CRM_CONTACT)
});
const agentList = combineReducers({
  ACTIVE: agentStatus('ACTIVE'),
  DEACTIVE: agentStatus('DEACTIVE'),
  NOT_CONFIRM: agentStatus('NOT_CONFIRM'),
  ALL: agentStatus('ALL')
});

// const desk = (state = {}, action) => {
//   let module = module(state.module, action);
//
//   return {
//     module: module,
//     selectedOrg: selectedOrg(state.selectedOrg, action),
//     orgList: orgList(state.orgList, action),
//     freezeLayer: freezeLayer(state.freezeLayer, action),
//     tabs: tabs(state.tabs, action),
//     currentUser: currentUser(state.currentUser, action),
//     ticketList: ticketList(state.ticketList, action)
//   };
// };

// Performance issue need to check recduer logic
const listActionDetails = (moduleName) => (state = {}, { type, data = {} }) => {
  const moduleL = moduleName.toLowerCase() || '';
  const moduleU = moduleName.toUpperCase() || '';
  switch (type) {
    /* case 'LIST_REQUEST':
    case 'LIST_NEXT_REQUEST':
    case 'LIST_PREVIOUS_REQUEST': */
    case 'DEPARTMENT_SELECT':
    case 'GET_PREFERENCE_REQUEST':
    case 'PREFERENCE_CHANGE':
    case 'LIST_OFFSET_SCROLL_REQUEST':
    case 'LIST_MASS_ACTION_SUCCESS':
    case 'GET_ARCHIVED_TICKETS_REQUEST':
      return {
        ...state,
        [`${moduleL}Request`]: true,
        [`${moduleL}Failure`]: false
      };
    case `${moduleU}_VIEW_REQUEST`:
      return {
        ...state,
        [`${moduleL}ViewRequest`]: true,
        [`${moduleL}ViewFailure`]: false
      };
    /* case 'LIST_FAILURE':
    case 'LIST_NEXT_FAILURE':
    case 'LIST_PREVIOUS_FAILURE': */
    case 'GET_ARCHIVED_TICKETS_FAILURE':
    case 'LIST_OFFSET_SCROLL_FAILURE': {
      const errorCode = selectn('status', data) || true;
      return {
        ...state,
        [`${moduleL}Request`]: false,
        [`${moduleL}Failure`]: errorCode
      };
    }
    case 'VIEW_FAILURE':
      return {
        ...state,
        [`${moduleL}ViewRequest`]: false,
        [`${moduleL}ViewFailure`]: true
      };
    /* case 'LIST_SUCCESS':
    case 'LIST_NEXT_SUCCESS':
    case 'LIST_PREVIOUS_SUCCESS': */
    case 'LIST_OFFSET_SCROLL_SUCCESS':
    case 'GET_ARCHIVED_TICKETS_SUCCESS':
      return { ...state, [`${moduleL}Request`]: false };
    case `${moduleU}_LIST_OFFSET_SCROLL_REQUEST`: // Tags Tickets
      return {
        ...state,
        [`${moduleL}TicketsRequest`]: true,
        [`${moduleL}TicketsFailure`]: false
      };
    case `${moduleU}_LIST_OFFSET_SCROLL_FAILURE`: {
      // Tags Tickets
      const errorCode = selectn('status', data) || true;
      return {
        ...state,
        [`${moduleL}TicketsRequest`]: false,
        [`${moduleL}TicketsFailure`]: errorCode
      };
    }
    case `${moduleU}_LIST_OFFSET_SCROLL_SUCCESS`: // Tags Tickets
      return { ...state, [`${moduleL}TicketsRequest`]: false };
    case 'VIEW_SUCCESS':
      return { ...state, [`${moduleL}ViewRequest`]: false };
    default:
      return state;
  }
};

export const snippetData = (state = {}, { type, data }) => {
  switch (type) {
    case 'OPEN_SNIPPET': {
      const newState = { ...state, mode: data.mode, editorId: data.editorId };
      return newState;
    }
    case 'CLOSE_SNIPPET': {
      const newState = { ...state, mode: null };
      return newState;
    }
    case 'SNIPPET_LIST_SUCCESS': {
      const newState = { ...state, snippetIds: data.result };
      return newState;
    }
    case 'DELETE_SNIPPET_SUCCESS': {
      const { snippetId } = data;
      const newState = { ...state };
      const oldList = newState.snippetIds;
      newState.snippetIds = oldList.filter((item) => snippetId !== item);
      return newState;
    }
    default:
      return state;
  }
};

export const collidingData = (state = {}, { type, data }) => {
  switch (type) {
    case 'COLLIDING_USERS_SUCCESS':
    case 'UPDATE_COLLISION_DATA_SUCCESS':
    case 'HANDLE_USERIN_SUCCESS':
    case 'HANDLE_USEROUT_SUCCESS':
    case 'HANDLE_USERONLINE_SUCCESS':
    case 'HANDLE_USERIDLE_SUCCESS':
    case 'HANDLE_USERREPLY_SUCCESS':
    case 'SET_NOVIWERS_SUCCESS': {
      const { ticketId } = data.collisionData;
      const collisionData = {
        ...state[ticketId],
        ...data.collisionData
      };
      return { ...state, [ticketId]: collisionData };
    }
    case 'UPDATE_COLLISION_CHATDATA': {
      const { ticketId } = data.chatData;
      const chatData = { ...state[ticketId], ...data.chatData };
      return { ...state, [ticketId]: chatData };
    }
    case 'CLEAR_COLLISION_DATA': {
      return { ...state, [data.ticketId]: {} };
    }
    default:
      return state;
  }
};

export const collisionNotificationList = (state = {}, { type, data }) => {
  switch (type) {
    case 'SHOW_COLLISION_NOTIFICATION': {
      const newState = { ...state };
      const { ticketId } = data;
      const notificationList = newState[ticketId] || [];
      const newList = notificationList.concat([data.res]);
      // newList = setCollisionReplyingAtTop(newList);
      return { ...state, [ticketId]: newList };
    }
    case 'HIDE_COLLISION_NOTIFICATION': {
      const { ticketId, notificationId } = data;
      const newState = { ...state };

      const notificationList = newState[ticketId] || [];
      const newList = notificationList.map((notification) => {
        const notificationNew = { ...notification };
        if (notificationNew.notificationId === notificationId) {
          notificationNew.showNotification = false;
          notificationNew.isRead = true;
        }
        return notificationNew;
      });
      return { ...state, [ticketId]: newList };
    }
    case 'TOGGLE_COLLISION_NOTIFICATION': {
      const { ticketId } = data;
      const newState = { ...state };
      const notificationList = newState[ticketId] || [];
      const resetNotificationList = notificationList.map((notification) => ({
        ...notification,
        showNotification: false
      }));
      return { ...state, [ticketId]: resetNotificationList };
    }
    case 'REMOVE_COLLISION_NOTIFICATION': {
      const { ticketId, notificationId } = data;
      const newState = { ...state };
      const notificationList = newState[ticketId] || [];
      const newList = notificationList.filter(
        (notification) => notification.notificationId !== notificationId
      );
      return { ...state, [ticketId]: newList };
    }
    case 'RESET_NOTIFICATION_LIST': {
      const { ticketId, notificationList } = data;
      return { ...state, [ticketId]: notificationList };
    }
    case 'CLEAR_COLLISION_DATA': {
      return { ...state, [data.ticketId]: [] };
    }
    default:
      return state;
  }
};

// const starredViewOrder = (state = [], action) => {
//   switch (action.type) {
//   case 'TICKETSTAREDVIEW_SUCCESS':
//     return action.data;
//   default:
//     return state;
//   }
// };

// const ticketViewOrder = (state = [], action) => {
//   switch (action.type) {
//   case 'TICKETVIEW_SUCCESS':
//     return action.data.result;
//   default:
//     return state;
//   }
// };

const commentsList = (module = '') => (state = {}, { type, data = {} }) => {
  const moduleU = module.toUpperCase();
  const moduleL = module.toLowerCase();
  const moduleId = `${moduleL}Id`;
  const allModuleVar = { ...taskVar };
  switch (type) {
    case `${moduleU}_NEXT_COMMENTS_SUCCESS`:
    case `${moduleU}_COMMENTS_SUCCESS`: {
      const { result = [], page = 1, isNext = false } = data || {};
      const oldComments = (state[data[moduleId]] || {}).comments || [];
      return {
        ...state,
        [data[moduleId]]: {
          comments:
            type === `${moduleU}_NEXT_COMMENTS_SUCCESS`
              ? [...oldComments, ...result]
              : result,
          isNext,
          page
        }
      };
    }
    case `${moduleU}_COMMENT_ADD_SUCCESS`: {
      const { result = [] } = data || {};
      const { comments: oldComments = [], page } = state[data[moduleId]] || {};
      const oldCommentsLen = oldComments.length;
      const newComments = [
        ...result,
        ...(oldCommentsLen === page * allModuleVar[`${moduleL}CommentsLimit`]
          ? oldComments.splice(0, oldCommentsLen - 1)
          : oldComments)
      ];
      return {
        ...state,
        [data[moduleId]]: {
          ...state[data[moduleId]],
          comments: newComments,
          isNext:
            newComments.length ===
            page * allModuleVar[`${moduleL}CommentsLimit`]
        }
      };
    }
    case `${moduleU}_COMMENT_DELETE_SUCCESS`: {
      const { id: commentId } = data;
      const oldComments = (state[data[moduleId]] || {}).comments || [];
      return {
        ...state,
        [data[moduleId]]: {
          ...state[data[moduleId]],
          comments: oldComments.filter((id) => id !== commentId)
        }
      };
    }
    default:
      return state;
  }
};

export const taskMassUpdateFields = (state = [], { type, data }) => {
  switch (type) {
    case 'TASK_MASSUPDATE_FIELD_SUCCESS':
      return data;
    default:
      return state;
  }
};

export const callMassUpdateFields = (state = [], { type, data }) => {
  switch (type) {
    case 'CALL_MASSUPDATE_FIELD_SUCCESS':
      return data;
    default:
      return state;
  }
};
export const eventMassUpdateFields = (state = [], { type, data }) => {
  switch (type) {
    case 'EVENT_MASSUPDATE_FIELD_SUCCESS':
      return data;
    default:
      return state;
  }
};
const popnotification = (state = [], { type, data }) => {
  switch (type) {
    case 'SHOW_POPNOTIFICATION':
      return [...new Set([...state, ...data])];
    case 'HIDE_POPNOTIFICATION': {
      const newState = state.filter((item) => item.id !== data.notifiId);
      return newState;
    }
    default:
      return state;
  }
};

export const reminderNotificationPopup = (state = [], { type, data }) => {
  switch (type) {
    case 'SHOW_REMINDER_POPNOTIFICATION':
      const newState = [...state];
      newState.push(data);
      return newState;
    case 'HIDE_REMINDER_POPNOTIFICATION': {
      const newState = state.filter((item) => item.actId !== data);
      return newState;
    }
    default:
      return state;
  }
};

export const rescheduleNotificationPopup = (state = [], { type, data }) => {
  switch (type) {
    case 'SHOW_RESCHEDULE_POPNOTIFICATION':
      return Object.assign([], state, data);
    case 'HIDE_RESCHEDULE_POPNOTIFICATION':
      return [];
    default:
      return state;
  }
};

export const pendingActivitiesNotification = (
  state = {},
  { type /* data */ }
) => {
  switch (type) {
    case 'OPEN_PENDINGACTIVITIES':
      return { ...state, isPendingActivitiesOpen: true };
    case 'CLOSE_PENDINGACTIVITIES':
      return { ...state, isPendingActivitiesOpen: false };
    default:
      return state;
  }
};

const instance = (state = {}, { type, data }) => {
  switch (type) {
    case 'SETINSTANCE':
      if (state[data.location]) {
        return {
          ...state,
          [data.location]: {
            ...state[data.location],
            ...data.instanceObj
          }
        };
      }
      return { ...state, [data.location]: data.instanceObj };

    default:
      return state;
  }
};

export const ticketUIState = (state = {}, { type, data }) => {
  switch (type) {
    case 'OPEN_TICKET_PEEK':
      return { ...state, ...data };
    case 'CLOSE_TICKET_PEEK':
      return {};
    case 'OPEN_TICKET_TASK':
      return { ...state, taskId: data.taskId };
    case 'CLOSE_TICKET_TASK':
      return { ...state, taskId: null };
    case 'OPEN_BOTCHAT':
      return { ...state, isBotChatOpen: true };
    case 'CLOSE_BOTCHAT':
      return { ...state, isBotChatOpen: false };
    case 'OPEN_TRANSITION_FORM':
      return {
        ...state,
        isTransitionFormOpen: true,
        transitionData: data,
        isCollapse: !data.hasReply
      };
    case 'CLOSE_TRANSITION_FORM':
      return { ...state, isTransitionFormOpen: false, transitionData: null };
    case 'TOGGLE_TRANSITION_FORM':
      return { ...state, isCollapse: data.isCollapse };
    case 'OPEN_REMOTE_ASSIST':
      return { ...state, isRemoteAssistOpen: true };
    case 'CLOSE_REMOTE_ASSIST':
      return { ...state, isRemoteAssistOpen: false };
    case 'SET_ISCOMMENT_CHANGED':
      return { ...state, isCommentChanged: true };
    case 'REVERTED_ISCOMMENT_CHANGED':
      return { ...state, isCommentChanged: false };
    case 'SET_ISEDITOR_CHANGED':
      return { ...state, isEditorChanged: true };
    case 'REVERTED_ISEDITOR_CHANGED':
      return { ...state, isEditorChanged: false };
    case 'EDITOR_STATE_UPDATED':
      return { ...state, ...data };
    case 'GET_COLLISION_COMPRESS_META_SUCCESS':
      return { ...state, collisionCompressMeta: data };
    case 'SET_REPLY_DATA': {
      const replyState = { ...state.replyState, ...data };
      return { ...state, replyState };
    }
    case 'SINGLE_UPDATE_SUCCESS': {
      return { ...state, singleUpdateState: data };
    }
    case '@@router/URL_CHANGE':
      return {
        ...state,
        isRemoteAssistOpen: false,
        isBotChatOpen: false,
        isTransitionFormOpen: false,
        taskId: null,
        transitionData: null
      };
    case 'OPEN_REPLY_EDITOR':
      return { ...state, ...data };
    case 'OPEN_CLOSE_COMMENT':
      return { ...state, ...data };
    default:
      return state;
  }
};

export const invoiceDetailInfo = (state = {}, { type, data }) => {
  switch (type) {
    case 'OPEN_INVOICE_DETAILS':
      return { ...state, ...data };
    case 'CLOSE_INVOICE_DETAILS':
      return {};
    default:
      return state;
  }
};

export const invoiceIframeFormInfo = (state = {}, { type, data }) => {
  switch (type) {
    case 'OPEN_INVOICE_IFRAME_FORM':
      return { ...state, ...data };
    case 'CLOSE_INVOICE_IFRAME_FORM':
      return {};
    default:
      return state;
  }
};

export const financeInfo = (state = {}, { type, data }) => {
  switch (type) {
    case 'OPEN_FINANCE_TAB': {
      const { isOpen, entity } = data;
      const { tabSelected } = state;
      return {
        ...state,
        isFinanceTabOpen: isOpen,
        entity: entity,
        tabSelected: entity || tabSelected
      };
    }
    case 'GETACTIVITY_SUCCESS': {
      const newActivity =
        data.pageNumber === 1 ? data.data : state.activities.concat(data.data);
      const noMoreData = data.data.length < 10;
      return {
        ...state,
        activities: newActivity,
        isRefresh: false,
        noMoreData
      };
    }
    case 'GETINVOICES_REQUEST':
      return { ...state, tabSelected: 'invoice' };
    case 'GETESTIMATES_REQUEST':
      return { ...state, tabSelected: 'estimate' };
    case 'GETINVOICES_SUCCESS': {
      const newInvoices =
        data.pageNumber === 1 ? data.data : state.invoices.concat(data.data);
      const noMoreData = data.data.length < 10;
      const { entity } = data;
      return {
        ...state,
        invoices: newInvoices,
        noMoreData,
        isRefresh: false,
        entity,
        tabSelected: 'invoice',
        isFinanceTabOpen: true
      };
    }
    case 'GETESTIMATES_SUCCESS': {
      const newEstimates =
        data.pageNumber === 1 ? data.data : state.estimates.concat(data.data);
      const noMoreData = data.data.length < 10;
      return {
        ...state,
        estimates: newEstimates,
        tabSelected: 'estimate',
        noMoreData,
        isRefresh: false,
        isFinanceTabOpen: true
      };
    }

    case 'FINANCECONTACT_SUCCESS': {
      let { serviceName } = data;
      let { financeContact = {} } = state;
      let contact = Object.assign({}, financeContact, { [serviceName]: data });
      return {
        ...state,
        financeContact: contact,
        isRefresh: false,
        serviceName,
        tabSelected: serviceName
      };
    }
    case 'MARKALL_INVOICE_SENT_SUCCESS':
    case 'MARKALL_ESTIMATE_SENT_SUCCESS':
    case 'CLEAR_SELECTED_FINANCE_ENTITIES': {
      return { ...state, selectedItem: [], isRefresh: false };
    }
    case 'CHANGE_INVOICE_MODULE': {
      return {
        ...state,
        selectedModule: data.module,
        selectedStatus: data.status,
        selectedFilter: data.selectedFilter,
        selectedItem: [],
        isRefresh: false
      };
    }
    case 'CHANGE_INVOICE_STATUS': {
      return {
        ...state,
        isRefresh: false,
        selectedStatus: data.status,
        selectedItem: []
      };
    }
    case 'CHANGE_FINANCE_ENTITY': {
      return {
        ...state,
        entity: data.entity,
        isRefresh: true,
        selectedModule: data.module,
        selectedStatus: data.status,
        // serviceName: data.entity,
        tabSelected: data.tabSelected
      };
    }
    case 'SELECT_INVOICE': {
      return { ...state, isRefresh: false, selectedItem: data.selectedItem };
    }
    // case 'RESET_INVOICE_DEFAULT_DATA': {
    //   return { };
    // }
    case 'GETSALESORDER_REQUEST': {
      return Object.assign({}, state, {
        isRefresh: false,
        isSalesOrderLoading: true,
        serviceName: 'inventory',
        tabSelected: 'inventory'
      });
    }
    case 'GETSALESORDER_SUCCESS': {
      let {
        salesOrderForContacts = {},
        salesOrderForCases = {},
        salesOrderJson = {}
      } = state;
      let salesOrderEntities = selectn('entities.salesorders', data) || {};
      let { pageNumber, deskModuleName } = data;
      if (pageNumber != 1) {
        salesOrderEntities = Object.assign(
          {},
          salesOrderJson[deskModuleName] || {},
          salesOrderEntities
        );
      }
      salesOrderJson = Object.assign({}, salesOrderJson, {
        [deskModuleName]: salesOrderEntities
      });
      let noMoreData = Object.keys(salesOrderEntities).length < 10;
      return Object.assign({}, state, {
        isSalesOrderLoading: false,
        salesOrderForContacts:
          deskModuleName == 'Contacts'
            ? salesOrderEntities
            : salesOrderForContacts,
        salesOrderForCases:
          deskModuleName == 'Cases' ? salesOrderEntities : salesOrderForCases,
        salesOrderJson,
        entity: 'inventory',
        tabSelected: 'inventory',
        noMoreData,
        isRefresh: false,
        isFinanceTabOpen: true
      });
    }
    case 'GET_PACKAGES_RETURNS_SUCCESS': {
      let {
        salesOrderForContacts = {},
        salesOrderForCases = {},
        salesOrderJson = {}
      } = state;
      let {
        packageNormalizedJson,
        salesreturnsNormalizedJson,
        deskModuleName,
        salesOrder
      } = data;
      let packagesEntities =
        selectn('entities.packages', packageNormalizedJson) || {};
      let salesReturnsEntities =
        selectn('entities.salesreturns', salesreturnsNormalizedJson) || {};
      let salesOrderJSON = salesOrderJson[deskModuleName] || {};
      let correspondingSalesOrder = Object.assign(
        {},
        salesOrderJSON[salesOrder.id],
        {
          packagesJson: packagesEntities,
          salesReturnsJson: salesReturnsEntities
        }
      );
      let salesOrderEntityJson = Object.assign({}, salesOrderJSON, {
        [salesOrder.id]: correspondingSalesOrder
      });
      return Object.assign({}, state, {
        salesOrderForContacts:
          deskModuleName == 'Contacts' || deskModuleName == 'Accounts'
            ? Object.assign({}, salesOrderJSON, {
                [salesOrder.id]: correspondingSalesOrder
              })
            : salesOrderForContacts,
        salesOrderForCases:
          deskModuleName == 'Cases'
            ? Object.assign({}, salesOrderJSON, {
                [salesOrder.id]: correspondingSalesOrder
              })
            : salesOrderForCases,
        salesOrderJson: Object.assign({}, salesOrderJson, {
          [deskModuleName]: salesOrderEntityJson
        }),
        entity: 'inventory',
        tabSelected: 'inventory',
        isRefresh: false,
        selectedSalesOrderId: correspondingSalesOrder.id
      });
    }
    case 'OPEN_SALESORDER': {
      let { selectedSalesOrder } = data;
      let { selectedSalesOrderId = '' } = state;
      if (selectedSalesOrderId == selectedSalesOrder.id) {
        return Object.assign({}, state, {
          selectedSalesOrderId: '',
          entity: 'inventory',
          tabSelected: 'inventory',
          isRefresh: false
        });
      } else {
        return Object.assign({}, state, {
          selectedSalesOrderId: selectedSalesOrder.id,
          entity: 'inventory',
          tabSelected: 'inventory',
          isRefresh: false
        });
      }
    }
    case 'GET_INVENTORY_PRODUCT_INFO_SUCCESS': {
      return Object.assign({}, state, { inventoryProductDetails: data });
    }
    case 'GET_SUBCRIPTIONS_REQUEST': {
      let { subscriptionsListJson } = state;
      let { entity = 'zohosubscriptions' } = data || {};
      let subscriptionsEntities =
        selectn('entities.subscriptions', data || {}) || {};
      return Object.assign({}, state, {
        subscriptionsListJson:
          typeof subscriptionsListJson === 'undefined'
            ? undefined
            : Object.assign({}, subscriptionsListJson, subscriptionsEntities),
        entity: entity,
        tabSelected: 'zohosubscriptions',
        noMoreData: Object.keys(subscriptionsEntities).length < 10,
        isRefresh: false,
        serviceName: 'zohosubscriptions'
      });
    }
    case 'GET_SUBCRIPTIONS_SUCCESS': {
      let { subscriptionsListJson = {} } = state;
      let { entity } = data;
      let subscriptionsEntities = selectn('entities.subscriptions', data) || {};
      return Object.assign({}, state, {
        subscriptionsListJson: Object.assign(
          {},
          subscriptionsListJson,
          subscriptionsEntities
        ),
        entity: entity,
        tabSelected: 'zohosubscriptions',
        noMoreData: Object.keys(subscriptionsEntities).length < 10,
        isRefresh: false,
        isFinanceTabOpen: true
      });
    }
    case 'GET_FINANCE_DATA_CONTACT_SUBSCRIPTIONS_SUCCESS': {
      let { FINANCE_TICKET_ADD_FORM = {} } = state;
      let { contactSubscriptions = {} } = FINANCE_TICKET_ADD_FORM;
      let { entity, pageNumber } = data;
      let subscriptionsEntities =
        selectn('entities.Contacts_subscriptions', data) || {};
      if (pageNumber === 1) {
        contactSubscriptions = { contactSubscriptions: subscriptionsEntities };
      } else {
        contactSubscriptions = {
          contactSubscriptions: Object.assign(
            {},
            contactSubscriptions,
            subscriptionsEntities
          )
        };
      }
      return Object.assign({}, state, {
        FINANCE_TICKET_ADD_FORM: Object.assign(
          {},
          FINANCE_TICKET_ADD_FORM,
          contactSubscriptions
        )
      });
    }
    case 'GET_FINANCE_DATA_ACCOUNT_SUBSCRIPTIONS_SUCCESS': {
      let { FINANCE_TICKET_ADD_FORM = {} } = state;
      let { accountSubscriptions = {} } = FINANCE_TICKET_ADD_FORM;
      let { entity, pageNumber } = data;
      let subscriptionsEntities =
        selectn('entities.Accounts_subscriptions', data) || {};
      if (pageNumber === 1) {
        accountSubscriptions = { accountSubscriptions: subscriptionsEntities };
      } else {
        accountSubscriptions = {
          accountSubscriptions: Object.assign(
            {},
            accountSubscriptions,
            subscriptionsEntities
          )
        };
      }
      return Object.assign({}, state, {
        FINANCE_TICKET_ADD_FORM: Object.assign(
          {},
          FINANCE_TICKET_ADD_FORM,
          accountSubscriptions
        )
      });
    }
    case 'GET_FINANCE_DATA_CONTACT_INVOICES_SUCCESS': {
      let { FINANCE_TICKET_ADD_FORM = {} } = state;
      let { contactInvoices = {} } = FINANCE_TICKET_ADD_FORM;
      let { entity, pageNumber } = data;
      let invoiceEntities = selectn('entities.Contacts_invoices', data) || {};
      if (pageNumber === 1) {
        contactInvoices = { contactInvoices: invoiceEntities };
      } else {
        contactInvoices = {
          contactInvoices: Object.assign({}, contactInvoices, invoiceEntities)
        };
      }
      return Object.assign({}, state, {
        FINANCE_TICKET_ADD_FORM: Object.assign(
          {},
          FINANCE_TICKET_ADD_FORM,
          contactInvoices
        )
      });
    }
    case 'GET_FINANCE_DATA_ACCOUNT_INVOICES_SUCCESS': {
      let { FINANCE_TICKET_ADD_FORM = {} } = state;
      let { accountInvoices = {} } = FINANCE_TICKET_ADD_FORM;
      let { entity, pageNumber } = data;
      let invoiceEntities = selectn('entities.Accounts_invoices', data) || {};
      if (pageNumber === 1) {
        accountInvoices = { accountInvoices: invoiceEntities };
      } else {
        accountInvoices = {
          accountInvoices: Object.assign({}, accountInvoices, invoiceEntities)
        };
      }
      return Object.assign({}, state, {
        FINANCE_TICKET_ADD_FORM: Object.assign(
          {},
          FINANCE_TICKET_ADD_FORM,
          accountInvoices
        )
      });
    }
    default: {
      return Object.assign({}, state, { isRefresh: false });
    }
  }
};

const lastAccess = (state = { views: {} }, { type, data }) => {
  switch (type) {
    case 'LASTACCESS_VIEWS_SUCCESS': {
      return { ...state, views: data.result };
    }
    case 'MODULE_LAST_ACCESS_VIEWS_SUCCESS': {
      const { moduleName } = data;
      const module =
        moduleName === 'activities' ? moduleName : `${moduleName}s`;
      return { ...state, views: { ...state.views, [module]: data.result } };
    }
    case 'RESET_LAST_ACCESS': {
      return { ...state, views: {} };
    }
    case 'LASTACCESS_TAGS_SUCCESS': {
      return { ...state, tag: data.tags };
    }
    case 'LASTACCESS_TEAMS_SUCCESS': {
      return { ...state, teams: { [data.deptId]: data.teams } };
    }
    case 'UPDATE_LASTACCESS_VIEWS_SUCCESS': {
      const views = { ...state.views, [data.module]: data.viewId };
      return { ...state, views };
    }
    case 'LASTACCESS_AGENTQ_VIEWS_SUCCESS': {
      return { ...state, agentq: data.agentq };
    }
    case 'UNARCHIVED_VIEW_SUCCESS': {
      const duplicateViews = { ...state.views };
      return {
        ...state,
        ...{ ...duplicateViews, tickets: data.viewId }
      };
    }
    case 'LASTACCESS_TICKET_VIEW_SUCCESS': {
      return { ...state, ticketsView: data.view };
    }
    default:
      return state;
  }
};

const taskStatusMapping = (state = {}, { type, data }) => {
  switch (type) {
    case 'TASK_STATUSMAPPING_SUCCESS':
      return { ...state, ...data };
    default:
      return state;
  }
};
const eventStatusMapping = (state = {}, { type, data }) => {
  switch (type) {
    case 'EVENT_STATUSMAPPING_SUCCESS':
      return { ...state, ...data };
    default:
      return state;
  }
};
const callStatusMapping = (state = {}, { type, data }) => {
  switch (type) {
    case 'CALL_STATUSMAPPING_SUCCESS':
      return { ...state, ...data };
    default:
      return state;
  }
};

const delinkTaskFromProjects = (state = {}, { type, data }) => {
  switch (type) {
    case 'DELINK_TASK_SUCCESS':
      return { ...state, ...data };
    default:
      return state;
  }
};

const isShowAnnouncementBanner = (state = false, { type }) => {
  switch (type) {
    case 'SHOW_ANNOUNCEMENT_BANNER':
      return true;
    case 'HIDE_ANNOUNCEMNET_BANNER' :
      return false;
    default:
      return state;
  }
};

const notifications = (state = {}, { type, data }) => {
  switch (type) {
    case 'RENDER_NOTIFICATION_DATA': {
      const newState = { ...state };
      if (newState.list) {
        newState.list = [...new Set([...newState.list, ...data.data])];
      } else {
        newState.list = data.data;
      }
      newState.morekey = data.morekey;
      return newState;
    }
    case 'APPEND_REALTIME_LIST': {
      const newState = { ...state };
      if (newState.newList) {
        newState.newList = [...new Set([...newState.newList, ...[data]])];
      } else {
        newState.newList = [data];
      }
      return newState;
    }
    case 'CLEAR_NOTIFICATION_LIST':
    case 'NOTIFICATION_DISABLE': {
      const newState = { ...state };
      newState.list = [];
      return newState;
    }
    default:
      return state;
  }
};

export const isNotificationDetailOpen = (state = false, { type }) => {
  switch (type) {
    case 'OPEN_NOTIFICATION_DETAILS':
      return true;
    case 'CLOSE_NOTIFICATION_DETAILS':
      return false;
    case 'NOTIFICATION_DISABLE':
      return false;
    case 'FREEZE_DISABLE':
      return false;
    default:
      return state;
  }
};

export const isNotificationsOpen = (state = false, { type }) => {
  switch (type) {
    case 'OPEN_NOTIFICATIONS':
      return true;
    case 'CLOSE_NOTIFICATIONS':
    case 'NOTIFICATION_DISABLE':
      return false;
    default:
      return state;
  }
};

export const isSwitchOldUIOpen =  (state = false, { type }) => {
  switch (type) {
    case 'OPEN_PROCEED_OLD_VERSION':
      return true;
    case 'CLOSE_PROCEED_OLD_VERSION':
      return false;
    default:
      return state;
  }
};

export const isFailureDetailOpen = (state = false, { type }) => {
  switch (type) {
    case 'OPEN_FAILURE_DETAILS':
      return true;
    case 'CLOSE_FAILURE_DETAILS':
      return false;
    case 'CLOSE_NOTIFICATION_DETAILS':
      return false;
    case 'NOTIFICATION_DISABLE':
      return false;
    case 'FREEZE_DISABLE':
      return false;
    default:
      return state;
  }
};

const bugTrackerConfiguration = (state = {}, { type, data }) => {
  switch (type) {
    case 'GET_BUGTRACKER_CONFIGURATION_SUCCESS': {
      return { ...state, ...data };
    }
    case 'GET_BUGTRACKER_PROJECTS_SUCCESS': {
      const obj = { [data.depId]: data.data };
      return { ...state, projects: obj };
    }
    default:
      return state;
  }
};

const notificationCount = (state = '', { type, data }) => {
  switch (type) {
    case 'UPDATE_NOTIFICATION_COUNT': {
      return data.count;
    }
    default:
      return state;
  }
};
export const isAcsInit = (state = false, { type }) => {
  switch (type) {
    case 'ACSINIT_SUCCESS':
      return true;
    default:
      return state;
  }
};

export const iframeContent = (state = {}, { type, data }) => {
  switch (type) {
    case 'ADD_AS_ARTICLE': {
      let newState = { ...state };
      newState = { ...newState, article: data };
      return newState;
    }
    case 'TOGGLE_IFRAME_BACK_NAVIGATION': {
      return { backNavigationURLData: data.backNavigationURLData };
    }
    default:
      return state;
  }
};

// export const timeZoneList=(state=null,{type,data})=>{
//   switch(type){
//     case "TIMEZONELIST_SUCCESS":
//          return Object.assign({}, state, data);
//       default:
//       return state;
//   }
// };

// export const countriesList=(state=null,{type,data})=>{
//   switch(type){
//     case "COUNTRIESLIST_SUCCESS":
//     console.log("in success countires",data);
//          return Object.assign({}, state, data);
//       default:
//       return state;
//   }
// }
// export const languageList=(state=null,{type,data})=>{
//   switch(type){
//     case "LANGUAGES_SUCCESS":
//     console.log("in success languages",data);
//          return Object.assign({}, state, data);
//       default:
//       return state;
//   }
// }
export const allDepartments = (state = null, { type, data }) => {
  switch (type) {
    case 'ALLDEPARTMENTS_SUCCESS':
      return { ...state, ...data };
    default:
      return state;
  }
};
export const locale = (state = {}, { type, data }) => {
  switch (type) {
    case 'COUNTRIESLIST_FAILURE':
      return state;
    case 'COUNTRIESLIST_SUCCESS':
      return { ...state, ...data };
    case 'LANGUAGESLIST_SUCCESS':
      return { ...state, ...data };
    case 'TIMEZONELIST_SUCCESS':
      return { ...state, Timezone: data.data };
    default:
      return state;
  }
};
export const pendingActivities = (state = {}, { type, data }) => {
  switch (type) {
    case 'PENDINGACTIVITIES_SUCCESS':
      return { ...state, ...data };
    default:
      return state;
  }
};

// Need contact lookup search
export const contactSearchFields = (state = [], { type, data } = {}) => {
  switch (type) {
    case 'SEARCH_FIELDS_AND_CONDITIONS_SUCCESS': {
      const { moduleName, fieldsOrder } = data;
      if (moduleName === 'contacts') {
        return fieldsOrder;
      }
      return state;
    }
    default:
      return state;
  }
};

// Need product lookup search
export const productSearchFields = (state = [], { type, data } = {}) => {
  switch (type) {
    case 'SEARCH_FIELDS_AND_CONDITIONS_SUCCESS': {
      const { moduleName, fieldsOrder } = data;
      if (moduleName === 'products') {
        return fieldsOrder;
      }
    }
    default:
      return state;
  }
};

export const portalOrder = (state = [], { type, data }) => {
  switch (type) {
    case 'ORG_SUCCESS':
      return Object.assign([], state, data.result);
    case 'USER_DEACTIVATED': {
      const updatedList = { ...state };
      delete updatedList[data];
      return updatedList;
    }
    default:
      return state;
  }
};

export const categoryList = (state = [], { type, data } = {}) => {
  switch (type) {
    case 'GET_CATEGORY_LIST_SUCCESS': {
      return data.categories;
    }
    default:
      return state;
  }
};

export const ziaNotifications = (state = {}, { type, data } = {}) => {
  switch (type) {
    case 'ZIA_NOTIFICATIONS_SHOW':
      return { ...state, isOpen: true };
    case 'ZIA_NOTIFICATIONS_HIDE':
      return { ...state, isOpen: false };
    case 'GET_ZIA_NOTIFICATIONS_SUCCESS': {
      let { responseData, next, type } = data;
      const responseNotificationObj = responseData.entities.notifications || {};
      const notificationIdArray = responseData.result || [];
      let notifications = state.notifications || {};
      const notificationIdsFromState = state[type] || [];
      next = { [type]: next };
      let notificationIds = [];
      if (notificationIdsFromState.length) {
        notificationIdArray.map((id) => {
          if (notificationIdsFromState.indexOf(id) === -1) {
            notificationIdsFromState.push(id);
          }
        });
        notificationIds = [...notificationIdsFromState];
      } else {
        notificationIds = [...notificationIdsFromState, ...notificationIdArray];
      }
      notifications = { ...notifications, ...responseNotificationObj };
      return { ...state, notifications, [type]: notificationIds, next };
    }
    case 'GET_ZIA_UNREAD_COUNT_WITH_NOTIFICATIONS_SUCCESS': {
      let {
        alertCount = 0,
        infoCount = 0,
        notifications = {},
        alert = [],
        info = []
      } = state;
      const newNotificationObj = { ...notifications };
      const notificationIdArray = data.result || [];
      const responseNotificationObj = data.entities.notifications || {};
      notificationIdArray.forEach((id) => {
        const obj = responseNotificationObj[id];
        if (!notifications[id]) {
          if (obj.category === 'ANOMALY' && !alert.includes(id)) {
            alert = [id, ...alert];
            Object.assign(newNotificationObj, { [id]: obj });
            alertCount += 1;
          } else if (
            ['TOPIC', 'FIELD_PREDICTION'].indexOf(obj.category) !== -1 &&
            !info.includes(id)
          ) {
            info = [id, ...info];
            Object.assign(newNotificationObj, { [id]: obj });
            infoCount += 1;
          }
        }
      });
      return {
        ...state,
        notifications: newNotificationObj,
        alertCount,
        infoCount,
        alert,
        info
      };
    }
    case 'GET_ZIA_NOTIFICATIONS_UNREAD_COUNT_SUCCESS': {
      const { alertCount, infoCount } = data;
      return { ...state, alertCount, infoCount };
    }
    case 'UPDATE_ZIA_UNREAD_NOTIFICATION_COUNT_SUCCESS': {
      if (data === 'alert') {
        return { ...state, alertCount: 0 };
      }
      if (data === 'info') {
        return { ...state, infoCount: 0 };
      }
      return state;
    }
    case 'UPDATE_ZIA_NOTIFICATION_UNREAD_TO_READ_IN_STORE': {
      const { id } = data;
      const { notifications } = state;
      if (notifications[id] && notifications[id].status) {
        return {
          ...state,
          notifications: Object.assign({
            ...notifications,
            [id]: { ...notifications[id], status: 'READ' }
          })
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export const gcChat = (state = {}, { type, data } = {}) => {
  switch (type) {
    case 'GC_CHAT_SHOW':
      return { ...state, isOpen: true };
    case 'GC_CHAT_HIDE':
      return { ...state, isOpen: false };
    case 'GC_CHAT_TOGGLE':
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
};

export const showDNBanner = (state = {}, { type /* data */ } = {}) => {
  switch (type) {
    case 'SHOW_DESKTOP_BANNER_SHOW':
      return { ...state, isOpen: true };
    case 'SHOW_DESKTOP_BANNER_HIDE':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export const generalBannerData = (state = {}, { type, data } = {}) => {
  switch (type) {
    case 'GET_BANNERDATA_SUCCESS':
    case 'SET_BANNERDATA':
      return data;
    default:
      return state;
  }
};

export const isWmsBarNeedSeprateStyle = (
  state = false,
  { type, data = {} }
) => {
  switch (type) {
    case 'SET_WMSBAR_STYLE':
      return selectn('isNeedSeprateStyle', data) || state;

    default:
      return state;
  }
};

export const isLoadedUnderZOUnifiedUI = (state = false,{ type,data={ } }) =>{
  switch (type) {
    case 'IS_LOADED_IN_UNIFIED_ZOHO_ONE':
      return selectn("isZohoOneUnifiedUI",data) || state;
    default:
      return state;
  }
}

const DVPropertiesPanelDefaultState = {
  tickets: true,
  accounts: true,
  contacts: true,
  calls: true,
  events: true,
  tasks: true,
  activities: true,
  contracts: true
};
export const isDVPropertiesPanelOpen = (
  state = DVPropertiesPanelDefaultState,
  { type, data = {} } = {}
) => {
  const { module } = data;
  switch (type) {
    case 'OPEN_DVPROPERTIESPANEL':
      return { ...state, [module]: true };
    case 'CLOSE_DVPROPERTIESPANEL':
      return { ...state, [module]: false };
    default:
      return state;
  }
};

export const freezeLayerCount = (state = 0, { type } = {}) => {
  switch (type) {
    case 'ENABLE_FREEZE':
      return state + 1;
    case 'DISABLE_FREEZE':
      return state - 1 >= 0 ? state - 1 : 0;
    default:
      return state;
  }
};

export const cnameProperties = (state = {}, { type, data } = {}) => {
  switch (type) {
    case 'CNAME_DEPRECATION_DETAILS_SUCCESS': {
      return { ...state, ...data };
    }
    default:
      return state;
  }
};

const reducers = {
  accountUIState,
  lastAccess,
  contactUIState,
  // i18n,
  channelPreferences,
  tabs,
  mergeInfo,
  commentHistoryInfo,
  // notificationPopup,
  freezeLayer,
  lookUpContainer,
  ajaxLoadingCount,
  previewObj,
  messageData,
  ticketDVNotificationData,
  shortcutData,
  alertData,
  realTimeConfirmAlert,
  module: modules,
  organizationFields : orgFields,
  isAcsInit,
  teamsList,
  iframeContent,
  allDepartments,
  alertPopup,
  locale,
  pendingActivities,
  pendingActivitiesNotification,
  dcProperties,
  gamificationNotification,
  gamificationParams,
  gamificationBadges,
  generalBannerData,
  freezeLayerCount,
  cnameProperties,
  isWmsBarNeedSeprateStyle,
  isLoadedUnderZOUnifiedUI,
  myInfo: (state = null, { type, data }) => {
    switch (type) {
      case 'MYINFO_SUCCESS':
        return {
          ...state,
          ...data.entities[moduleConst.AGENT_L][data.result]
        };
      case 'GET_TEAMS_BY_AGENT': {
        const { isCurrentUser, entities, result } = data;
        if (isCurrentUser) {
          return {
            ...state,
            ...entities[moduleConst.AGENT_L][result]
          };
        }
        return state;
      }
      case 'AGENTPHOTOUP_SUCCESS':
        return {
          ...state,
          ...data.entities[moduleConst.AGENT_L][data.result]
        };

      case 'AGENTPHOTODEL_SUCCESS':
        return {
          ...state,
          ...data.entities[moduleConst.AGENT_L][data.result]
        };
      case 'MYPREFERENCES_UPDATE_SUCCESS':
        return { ...state, ...data };
      case 'TELEPHONY_CONFIG_SUCCESS':
        return { ...state, ...data.userProp };
      case 'TELEPHONY_C2C':
        return { ...state, click2CallEnabled: data };
      case 'DEPARTMENTS_SUCCESS': {
        const { result = [] } = data;
        return {
          ...state,
          associatedDepartments: result,
          associatedDepartmentIds: result
        };
      }
      case 'LASTACCESS_TICKET_VIEW_SUCCESS': {
        let ticketsView = 'LIST';
        if (data.view === TICKETSVIEW.LIST_COMPACT) {
          ticketsView = 'LIST_COMPACT';
        } else if (data.view === TICKETSVIEW.TABLE) {
          ticketsView = 'TABLE';
        }
        return { ...state, ticketsView };
      }
      case 'UPDATE_MYINFO_PREFERENCE':
        return { ...state, ...data };
      default:
        return state;
    }
  },
  myPreferences: (state = null, { type, data }) => {
    switch (type) {
      case 'SIGNATURE_SUCCESS':
      case 'SIGNATURE_UPDATE_SUCCESS':
        return { ...state, signatureObj: data.data, signUpdationSuccess: true };
      case 'SIGNATURE_UPDATE_FAILURE':
        return { ...state, signUpdationSuccess: false };

      case 'LANDINGPAGES_SUCCESS':
      case 'MYPREFERENCES_SUCCESS':
        return { ...state, ...data };

      case 'MYPREFERENCES_UPDATE_SUCCESS':
        return { ...state, ...data };

      default:
        return state;
    }
  },
  integrations: (state = {}, { type, data }) => {
    switch (type) {
      case 'INTEGRATIONS_SUCCESS':
        return data.data;
      default:
        return state;
    }
  },
  analyticsIntegration: (state = {}, { type, data }) => {
    switch (type) {
      case `${ANALYTICS_INTEGRATION}_SUCCESS`:
        return data.data;
      default:
        return state;
    }
  },
  analyticsConfig: (state = {}, { type, data }) => {
    switch (type) {
      case `${ANALYTICS_CONFIG}_SUCCESS`:
        return data.data;
      default:
        return state;
    }
  },
  currentOrgId: (state = null, { data, type }) => {
    switch (type) {
      case `CURRENT_${moduleConst.ORGANIZATION}_SUCCESS`:
        return `${data.result}`;
      default:
        return state;
    }
  },
  portalOrder,

  departmentOrder: departmentList,
  activeAgents,
  // routing: routing(getUrls(currentOrg.domainMapped)),
  moduleMeta: entity(moduleConst.MODULE_META),
  // ticketProperties: (state = {}, { type, data }) => {
  //   if (type == 'LAYOUT_SUCCESS') {
  //     if (data.module != 'ticket') {
  //       return state;
  //     }
  //     return data.layout;
  //   }
  //   return state;
  // },
  // contactProperties: (state = {}, { type, data }) => {
  //   if (type == 'LAYOUT_SUCCESS') {
  //     if (data.module != 'contact') {
  //       return state;
  //     }
  //     return data.layout;
  //   }
  //   return state;
  // },
  moduleMapper: (state = {}, { type, data }) => {
    if (type === 'MODULEMETA_SUCCESS') {
      return data.mapper;
    }
    return state;
  },
  departmentMapper: (state = {}, { type, data }) => {
    if (
      type === 'MYINFO_SUCCESS' ||
      type === 'DEPARTMENT_SUCCESS' ||
      type === 'DEPARTMENTS_SUCCESS'
    ) {
      return { ...state, ...data.mapper };
    }
    return state;
  },
  orgMapper: (state = {}, { type, data }) => {
    if (type === 'ORG_SUCCESS' || type === 'ORGANIZATIONUPDATE_SUCCESS') {
      return { ...state, ...data.mapper };
    }
    return state;
  },
  widgetMapper: (state = {}, { type, data }) => {
    switch (type) {
      case `${mpModuleConst.WIDGETS}_SUCCESS`:
      case `${mpModuleConst.MY_INSTALLED_WIDGETS}_SUCCESS`:
      case `${mpModuleConst.INSTALLED_EXTENSION}_SUCCESS`:
      case `${mpModuleConst.MY_INSTALLED_EXTENSION}_SUCCESS`:
      case `${mpModuleConst.INSTALLED_EXTENSIONS}_SUCCESS`:
      case `${mpModuleConst.MY_INSTALLED_EXTENSIONS}_SUCCESS`:
        return { ...state, ...data.mapper };

      default:
        return state;
    }
  },
  license: (state = {}, { type, data }) => {
    switch (type) {
      case 'LICENSE_SUCCESS':
        return data;
      default:
        return state;
    }
  },
  agentList,
  queue,
  showPortalList: (state = false, { type }) => {
    switch (type) {
      case 'OPEN_MY_PORTALS':
        return true;
      case 'CLOSE_MY_PORTALS':
        return false;
      default:
        return state;
    }
  },
  screenMode: (state = SCREEN.MEDIUM, { type, data }) => {
    switch (type) {
      case 'SCREEN_SUCCESS':
        return data;
      default:
        return state;
    }
  },
  isBrowserTabActive: (state = true, { type, data }) => {
    switch (type) {
      case 'BROWSER_TAB_STATUS': {
        return data;
      }
      default:
        return state;
    }
  },
  marketplace,

  deskUrls: (state = {}, { type, data }) => {
    if (type === 'DESK_URLS') {
      return { ...state, ...data };
    }
    return state;
  },
  trialInfo: (state = {}, { type, data }) => {
    if ('TRIAL_INFO_SUCCESS' === type) {
      return { ...state, ...data };
    }
    return state;
  },
  isUserInfoOpen: (state = {isSubDrawerOpen: false, subSection: '', isPopupOpen: false}, { type /* data */, data }) => {
    switch (type) {
      case 'OPEN_USERINFO_POPUP':
        return {...state, ...data};
      case 'CLOSE_USERINFO_POPUP':
        return {...state, ...data};
      case 'OPEN_USERPOPUP_CRMPLUS':
        return {...state, ...data}
      default:
        return state;
    }
  },
  companyDetails: (state = { companyLogoURL:null, isInvalidCompanyLogo:false }, { type, data }) => {
    if ('RENDER_COMPANY_LOGO' === type) {
      return { ...state, ...data };
    }
    return state;
  },
  isDVPropertiesPanelOpen,

  domainName: (state = '', { type, data = '' }) => {
    if (type === 'SET_DOMAIN_NAME') {
      return data;
    }
    return state;
  },

  onboardingStatus,
  isPageLoaded,
  isChatWithUsEnabled,
  
  // taskList: listPage('task', taskViewUIState, ['sorting', 'sortBy']),
  ticketStatusMapping: (state = {}, action) => {
    switch (action.type) {
      case 'TICKET_STATUS_MAPPING_SUCCESS':
        return { ...state, ...action.data };
      default:
        return state;
    }
  },
  taskComments: commentsList('task'),
  callComments: commentsList('call'),
  eventComments: commentsList('event'),
  isLoading: loader,
  globalSearch,
  keyboardUIStatus: (state = false, action) => {
    switch (action.type) {
      case 'OPEN_KEYBOARD_UI':
        return true;

      case 'CLOSE_KEYBOARD_UI':
        return false;
      default:
        return state;
    }
  },
  taskListActions: createFilteredReducer(
    listActionDetails(moduleConst.TASK_L),
    (action) => action.data && action.data.moduleName === moduleConst.TASK_L
  ),
  activitiesListActions: createFilteredReducer(
    listActionDetails(moduleConst.ACTIVITIES_L),
    (action) =>
      action.data && action.data.moduleName === moduleConst.ACTIVITIES_L
  ),
  eventListActions: createFilteredReducer(
    listActionDetails(moduleConst.EVENT_L),
    (action) => action.data && action.data.moduleName === moduleConst.EVENT_L
  ),
  callListActions: createFilteredReducer(
    listActionDetails(moduleConst.CALL_L),
    (action) => action.data && action.data.moduleName === moduleConst.CALL_L
  ),
  ticketListActions: createFilteredReducer(
    listActionDetails(moduleConst.TICKET_L),
    (action) =>
      action.data &&
      (action.data.moduleName === moduleConst.TICKET_L ||
        action.type === 'DEPARTMENT_SELECT')
  ),
  tagListActions: createFilteredReducer(
    listActionDetails(moduleConst.TAG_L),
    (action) => action.data && action.data.moduleName === moduleConst.TAG_L
  ),
  accountListActions: createFilteredReducer(
    listActionDetails(moduleConst.ACCOUNT_L),
    (action) => action.data && action.data.moduleName === moduleConst.ACCOUNT_L
  ),
  contactListActions: createFilteredReducer(
    listActionDetails(moduleConst.CONTACT_L),
    (action) => action.data && action.data.moduleName === moduleConst.CONTACT_L
  ),
  contractListActions: createFilteredReducer(
    listActionDetails(moduleConst.CONTRACT_L),
    (action) =>
      action.data &&
      (action.data.moduleName === moduleConst.CONTRACT_L ||
        action.type === 'DEPARTMENT_SELECT')
  ),
  taskMassUpdateFields,
  eventMassUpdateFields,
  callMassUpdateFields,
  // ticketsLoading: (state = '', action) => {
  //   switch (action.type) {
  //     case 'TAG_TICKETS_REQUEST':
  //     case 'TICKETS_REQUEST':
  //       return 'loading';
  //     case 'TICKETS_SUCCESS':
  //     case 'TICKETS_FAILURE':
  //       return 'done';
  //   }
  //   return state;
  // },
  // accountList: listPage(moduleConst.ACCOUNT_L, accountViewUIState, [
  //   'alphabet'
  // ]),

  departmentSpecificState,
  isSetupOpened: (state=false, {type, data}={}) => {
    switch(type) {
      case "TOGGLE_SETUP_HOME":
        return data;
      default:
        return state;
    }
  },
  // onlineAgents,
  // offlineAgents,
  // customerHappiness,
  // mostThreadedTickets,
  // onlineAgentsTotalCount,
  // offlineAgentsTotalCount,
  previousRouting: (state = {}, {
    type,
    data
  } = {}) => {
    switch(type) {
      case 'PREVIOUS_ROUTING_DATA':
        return data
      default:
        return state
    }
  },
  collidingData,
  collisionNotificationList,
  snippetData,
  ticketUIState,
  instance,
  popnotification,
  reminderNotificationPopup,
  rescheduleNotificationPopup,
  taskStatusMapping,
  callStatusMapping,
  eventStatusMapping,
  delinkTaskFromProjects,
  isShowAnnouncementBanner,
  UIState,
  rolesList,
  notificationCount,
  notifications,
  isNotificationDetailOpen,
  isNotificationsOpen,
  isSwitchOldUIOpen,
  isFailureDetailOpen,
  invoiceDetailInfo,
  invoiceIframeFormInfo,
  financeInfo,
  dependencyMapping,
  myForm,
  isFeedBackFormOpen,
  bugTrackerConfiguration,
  accountLookup,
  twitterLookup,
  contactLookup,
  productLookup,
  ticketLookup,
  currentTrialEdition,
  brandsData: getBrands(),
  facebook: getFacebookObj(),
  instagram: getInstagramObj(),
  handleAuthors: getAuthors(),
  twitter: getTwitterObj(),
  convMessageData: getMessagesData(),
  brandStats: getBrandStats(),
  socialStatus: setSocialStatus(),
  socialCursors: setSocialCursor(),
  socialData,
  socialNftnData: setSocialNftnData(),
  socialRealTimeNftn: setSocialRealTimeNftn(),
  isCloudAttchOpen,
  accountSlaFormInfo,
  ticketTemplate,
  duplicates,
  sharedDepartmentAgentIds,
  customChannelsInfo,
  requestFlags,
  contactSearchFields,
  productSearchFields,
  navigationHandler,
  myActiveTimers,
  categoryList,
  localStorages,
  ziaNotifications,
  gcChat,
  showDNBanner,
  timer: Timer,
  timeEntryUIState,
  myLayouts,
  chatNftnData: chatNftnData(),
  chatInitData: chatInitData(),
  skills,
  allLayouts,
  uiPreference: themeReducer,
  microsoftInfo,
  syncExtensionsInfo,
  imState,
  lensInfo,
  contactFeaturePermissions,
  ...customModule,
  customPredictors,
  businessHours
};

const resultReducers = { ...reducers, ...setupReducers };

export default resultReducers;
