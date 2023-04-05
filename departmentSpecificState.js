/* eslint-disable array-callback-return */

/** * Libraries ** */
import { combineReducers } from 'redux';

/** * Methods ** */
import { listView } from '../modules/_reducers/listView';
import {
  agentTicketCount,
  activeAgentsInDept
} from '../modules/tickets/queue/reducers/queueView';
import { tagsList, isTagRename } from '../modules/tickets/tag/reducers/tagView';
import {
  fieldsList,
  CVFields,
  massUpdateFieldsList,
  availableFields
} from '../submodules/all_forms/reducers/fields';
import { departmentSpecificWidgets } from '../modules/marketplace/redcuers/departmentSpecificWidgets';
import { createFilteredReducer } from '../modules/_utils/CommonUtils';
import {
  agentListReducer,
  teamsList
} from '../modules/setup/agents/reducers/agent';
import {
  feedsKeyObj,
  selectedFeedView
} from '../submodules/feeds/reducers/feeds';
import { macrosList } from '../modules/tickets/detail/reducers/marcos';
import {
  mailConfigurations,
  fromEmailAddress,
  linkHolder
} from '../modules/tickets/detail/reducers/reply';
import { notificationrules } from '../modules/topbar/notification/reducers/notificationrules';
import { emailFailure } from '../modules/topbar/notification/reducers/emailFailure';
import {
  onlineAgentListReducer,
  offlineAgents,
  customerHappiness,
  mostThreadedTickets,
  // onlineAgentsTotalCount,
  onlineAgentsType,
  offlineAgentsTotalCount,
  liveTrafficFor1Hr,
  bandwidth,
  unassignedTicketsCount,
  agentsOpenTickets,
  ticketsRatingCount,
  selectedRatingsIcon,
  openStatusTickets,
  overdueStatusTickets,
  openTicketsCount,
  overdueTicketsCount
} from '../modules/headquarters/reducers/headQuarters';
import { channelsList } from '../modules/tickets/_reducers/channel';
import { automationAlerts } from '../modules/setup/reducers/automation/Alerts';
import {
  emailTemplates,
  emailTemplatesWithFolders,
  starredTemplates
} from '../modules/setup/reducers/automation/EmailTemplates';
import { automationTasks } from '../modules/setup/reducers/automation/Tasks';
import {
  automationFieldUpdates,
  automationFieldsToUpdate
} from '../modules/setup/reducers/automation/FieldUpdates';
import createDepartmentSpecificState from './createDepartmentSpecificState';
import { loadTimeTrackSetting } from '../modules/setup/reducers/TimeTrack';
import {
  activeStatusTickets,
  ticketsByState,
  reopenedTickets,
  ticketsHandlingTimeByStatus,
  activeStatusTicketsCount,
  ticketsByStateCount,
  reopenedTicketsCount,
  ticketsAvgHandlingTimeByStatus,
  ticketsHandlingTimeByAgent
} from '../modules/analytics/reports/reducers/reportsReducer';
import archivedTicketsReducer from '../modules/tickets/list/reducers/archivedTicketsReducer';
import { defaultDashboard } from '../analytics/reducers/defaultDashboard';
import pendingApprovals from '../submodules/reducers/pendingApprovals';
import { getConfig } from '../modules/customers/_config';
import { setupDetails } from '../modules/setup/reducers/setupPage';

/** * Constants ** */
import {
  moduleConst,
  /* TICKET_INFO, */
  MODULE_STATE_MAPPER
} from '../modules/_constants/index';
import { TICKET_COMMON } from '../modules/tickets/queue/constants';
import { customPredictionsData } from './customPredictorsState';

/* move to constant */
const taskUIState = {
  preference: {},
  pagination: {
    isNext: false,
    page: 1
  },
  list: []
};
const callUIState = {
  preference: {},
  pagination: {
    isNext: false,
    page: 1
  },
  list: []
};
const eventUIState = {
  preference: {},
  pagination: {
    isNext: false,
    page: 1
  },
  list: []
};
const activitiesUIState = {
  preference: {},
  pagination: {
    isNext: false,
    page: 1
  },
  list: []
};
const customerViewUIState = {
  preference: {
    perPage: 10,
    alphabet: 'all'
  },
  pagination: {
    isNext: false,
    page: 1
  },
  list: []
};
const accountViewUIState = {
  preference: {
    perPage: 10,
    alphabet: 'all'
  },
  pagination: {
    isNext: false,
    page: 1
  },
  list: []
};
const ticketUIState = {
  preference: {},
  // Pagination needed to be removed.
  pagination: {
    isNext: false,
    page: 1
  },
  list: [],
  wmsTickets: []
};
const contractViewUIState = {
  preference: {},
  pagination: {
    isNext: false,
    page: 1
  },
  list: []
};
const moduleUIState = {
  preference: {},
  list: []
};
// let tagTicketUIState = {
//   preference: {
//     sorting: false,
//     sortBy: 'recentThread',
//     perPage: 10
//   },
//   pagination: {
//     isNext: false,
//     page: 1
//   },
//   list: [],
//   wmsTickets: []
// };

export function listStateReducerPredicate(moduleName = '', action = {}) {
  return (
    (action.data && action.data.moduleName === moduleName) ||
    action.type === 'DEPARTMENT_SELECT'
  );
}
const listViewReducer = listView(moduleUIState, ['sorting', 'sortBy']);
const moduleListReducerObj = combineReducers(
  (() => {
    const result = {};
    getConfig().modules.map((module) => {
      result[module] = createFilteredReducer(listViewReducer, (action) =>
        listStateReducerPredicate(MODULE_STATE_MAPPER[module], action)
      );
    });
    return result;
  })()
);

const departmentSpecificReducer = combineReducers({
  ticketList: createFilteredReducer(
    listView(ticketUIState, ['sorting', 'sortBy']),
    (action) => listStateReducerPredicate(moduleConst.TICKET_L, action)
  ),
  taskList: createFilteredReducer(
    listView(taskUIState, ['sorting', 'sortBy']),
    (action) => listStateReducerPredicate(moduleConst.TASK_L, action)
  ),
  callList: createFilteredReducer(
    listView(callUIState, ['sorting', 'sortBy']),
    (action) => listStateReducerPredicate(moduleConst.CALL_L, action)
  ),
  eventList: createFilteredReducer(
    listView(eventUIState, ['sorting', 'sortBy']),
    (action) => listStateReducerPredicate(moduleConst.EVENT_L, action)
  ),
  activitiesList: createFilteredReducer(
    listView(activitiesUIState, ['sorting', 'sortBy']),
    (action) => listStateReducerPredicate(moduleConst.ACTIVITIES_L, action)
  ),
  contactList: createFilteredReducer(
    listView(customerViewUIState, ['alphabet']),
    (action) => listStateReducerPredicate(moduleConst.CONTACT_L, action)
  ),
  accountList: createFilteredReducer(
    listView(accountViewUIState, ['alphabet']),
    (action) => listStateReducerPredicate(moduleConst.ACCOUNT_L, action)
  ),
  contractList: createFilteredReducer(
    listView(contractViewUIState, ['sorting', 'sortBy']),
    (action) => listStateReducerPredicate(moduleConst.CONTRACT_L, action)
  ),
  moduleList: moduleListReducerObj,
  // tagList: tagsList,
  tagList: createFilteredReducer(tagsList, (action) =>
    listStateReducerPredicate(moduleConst.TAG_L, action)
  ),
  isTagRename,
  archivedTicketsList: createFilteredReducer(archivedTicketsReducer, (action) =>
    listStateReducerPredicate(moduleConst.TICKET_L, action)
  ),
  widgets: departmentSpecificWidgets,
  macrosList,
  // installedExtensions,
  fieldsList,
  massUpdateFieldsList,
  availableFields,
  agentTicketCount,
  activeAgentsInDept,
  mailConfigurations,
  fromEmailAddress,
  linkHolder,
  onlineAgentList: onlineAgentListReducer,
  offlineAgents,
  customerHappiness,
  mostThreadedTickets,
  // onlineAgentsTotalCount,
  onlineAgentsType,
  offlineAgentsTotalCount,
  liveTrafficFor1Hr,
  bandwidth,
  unassignedTicketsCount,
  agentsOpenTickets,
  ticketsRatingCount,
  selectedRatingsIcon,
  openStatusTickets,
  overdueStatusTickets,
  openTicketsCount,
  overdueTicketsCount,
  channelsList,
  activeStatusTickets,
  ticketsByState,
  reopenedTickets,
  ticketsHandlingTimeByStatus,
  activeStatusTicketsCount,
  ticketsByStateCount,
  reopenedTicketsCount,
  ticketsAvgHandlingTimeByStatus,
  ticketsHandlingTimeByAgent,
  /* queue: combineReducers({
    crm: q_allslots,
    duedate: q_allslots,
    priority: q_allslots,
    status: q_allslots
  }), */
  accountCVFields: createFilteredReducer(
    CVFields,
    (action) => action.data && action.data.moduleName === moduleConst.ACCOUNT_L
  ),
  contactCVFields: createFilteredReducer(
    CVFields,
    (action) => action.data && action.data.moduleName === moduleConst.CONTACT_L
  ),
  ticketCVFields: createFilteredReducer(
    CVFields,
    (action) => action.data && action.data.moduleName === moduleConst.TICKET_L
  ),
  contractCVFields: createFilteredReducer(
    CVFields,
    (action) => action.data && action.data.moduleName === moduleConst.CONTRACT_L
  ),
  automationAlerts,
  emailTemplates,
  emailTemplatesWithFolders,
  starredTemplates,
  automationTasks,
  automationFieldUpdates,
  automationFieldsToUpdate,
  taskCVFields: createFilteredReducer(
    CVFields,
    (action) => action.data && action.data.moduleName === moduleConst.TASK_L
  ),
  callCVFields: createFilteredReducer(
    CVFields,
    (action) => action.data && action.data.moduleName === moduleConst.CALL_L
  ),
  eventCVFields: createFilteredReducer(
    CVFields,
    (action) => action.data && action.data.moduleName === moduleConst.EVENT_L
  ),
  activitiesCVFields: createFilteredReducer(
    CVFields,
    (action) =>
      action.data && action.data.moduleName === moduleConst.ACTIVITIES_L
  ),
  agentList: agentListReducer,
  feedsKeyObj,
  selectedFeedView,
  feedsKeys: (state = {}, action) => {
    switch (action.type) {
      case 'FEEDS_VIEWS_KEY_SUCCESS':
        return action.data.feedsViewKey;
      default:
        return state;
    }
  },
  teamsList,
  timetrack: createFilteredReducer(
    loadTimeTrackSetting,
    (action) => action.type.indexOf('TIMETRACK') !== -1
  ),
  emailFailure,
  notificationrules,
  ziaStatus: (state = null, action) => {
    switch (action.type) {
      case 'ZIA_STATUS_SUCCESS':
        return action.data.status;
      default:
        return state;
    }
  },
  ticketStatusMapping: (state = [], action) => {
    switch (action.type) {
      case `${TICKET_COMMON.TICKET_STATUS_MAPPING_BY_DEPT}_SUCCESS`:
        return action.data.statusMapping;
      default:
        return state;
    }
  },
  featurePermission: (state = null, { type, data }) => {
    switch (type) {
      case 'FEATURE_PERMISSIONS_SUCCESS':
        return data.data;
      default:
        return state;
    }
  },
  defaultDashboard,
  pendingApprovals,
  setupDetails,
  customPredictionsData
});

export const departmentSpecificState = createDepartmentSpecificState(
  departmentSpecificReducer
);
