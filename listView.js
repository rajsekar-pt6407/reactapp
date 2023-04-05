import { arraySet, splitBluePrintViews } from '../_utils/CommonUtils';
import { INFINITE_SCROLL, TICKET_INFO } from '../_constants/index';
import selectn from 'selectn';

const listViewUIState = (
  state,
  action,
  UIStateInitial = {},
  mandatoryPref = []
) => {
  state = state || UIStateInitial;
  switch (action.type) {
    /* case 'LIST_SUCCESS':
    case 'LIST_NEXT_SUCCESS':
    case 'LIST_PREVIOUS_SUCCESS': {
      let oldList = state.list;
      let { page, isNext, result } = action.data;
      let { perPage } = state.preference;
      let from = (page - 1) * parseInt(perPage);
      let limit = perPage * 2 >= 100 ? 99 : perPage * 2;
      let to = from + limit;
      let { page: oldPage } = state.pagination;
      let newList = arraySet(oldList.slice(0, from), result);
      newList = isNext
        ? arraySet(newList, oldList.slice(to, oldList.length))
        : newList;
      return Object.assign({}, state, {
        list: newList,
        pagination: { isNext, page: oldPage }
      });
    } */
    case 'LIST_OFFSET_SCROLL_SUCCESS':
    case 'LIST_OFFSET_SCROLL_NEXT_SUCCESS': {
      const oldList = state.list || [];
      const { preference } = state || {};
      const { fromIndex, result, filterString } = action.data;
      const limit = INFINITE_SCROLL.SCROLL_LIMIT;
      preference.alphabet = filterString || 'All';
      let newList = oldList.slice();
      if (fromIndex - 1 > newList.length) {
        newList = newList.filter((value, index) => {
          if (result.indexOf(value) === -1) {
            return true;
          }
        });
        newList = newList.concat(result);
      } else {
        newList = arraySet(newList.slice(0, fromIndex - 1), result);
      }

      return { ...state, list: newList,
        noMoreData: result.length < limit};
    }
    case 'TICKET_LEFT_LIST_SUCCESS': {
      const oldList = state.list;
      const { result } = action.data;
      const newList = arraySet(oldList, result);
      return { ...state, list: newList};
    }
    case 'CONTACT_LEFT_LIST_SUCCESS': {
      const oldList = state.list;
      const { result, filterString, from } = action.data;
      const newList =
        filterString && from == 1 ? result : arraySet(oldList, result);
      return { ...state, list: newList};
    }
    case 'CLEAR_WMS_LIST_SUCCESS': {
      const wmsTickets = state.wmsTickets.slice();
      wmsTickets.splice(wmsTickets.indexOf(action.data.id), 1);
      return { ...state, wmsTickets};
    }
    case 'CLEAR_ALL_WMS_LIST': {
      return { ...state, wmsTickets: []};
    }
    case 'WMS_LIST_ADD_SUCCESS': {
      const { wmsTickets = [] } = state;
      const { ticketList, isUpdate = false } = action.data;
      return { ...state, list: ticketList,
        wmsTickets: !isUpdate ? wmsTickets.concat(action.data.id) : wmsTickets};
    }
    case 'GET_TABLE_SELECTED_FIELDS_SUCCESS':
    case 'UPDATE_TABLE_SELECTED_FIELDS_SUCCESS': {
      const { selectedFields } = action.data;
      return { ...state, selectedFields};
    }
    /* case 'LIST_PREVIOUS_REQUEST':
    case 'LIST_NEXT_REQUEST': {
      let { list, pagination, preference } = state;
      let { page } = pagination;
      let { perPage } = preference;
      let updatedPage =
        action.type === 'LIST_NEXT_REQUEST'
          ? page + 1
          : page - 1 === 0
            ? 1
            : page - 1;
      let from = (updatedPage - 1) * perPage;
      let to = from + perPage;
      let listItems = list.slice(from, to) || [];
      let listItemsLen = listItems.length;
      return Object.assign({}, state, {
        pagination: { page: updatedPage, isNext: perPage === listItemsLen }
      });
    } */
    case 'PREFERENCE_CHANGE': {
      let isClear = false;
      const payloadKeys = Object.keys(action.data.payload || {});
      for (let i = 0; i < payloadKeys.length; i++) {
        const payloadKey = payloadKeys[i];
        if (
          mandatoryPref.indexOf(payloadKey) >= 0 &&
          state.preference[payloadKey] !== action.data.payload[payloadKey]
        ) {
          isClear = true;
          break;
        }
      }
      return { ...state, preference: { ...state.preference, ...action.data.payload},
        list: isClear ? [] : state.list,
        pagination: { ...state.pagination, page: 1}};
    }
    case 'CLEAR_ALL':
      return { ...state, ...UIStateInitial};
    case '@@router/URL_CHANGE':
      return { ...state, pagination: { ...state.pagination, page: 1}};
    case 'DELETE_SUCCESS': {
      return { ...state, list: (state.list || []).filter(entity => {
          let entityId = entity;
          if (typeof entity === 'object') {
            entityId = entity.id;
          }
          return action.data.id.indexOf(entityId) === -1;
        })};
    }
    case 'CONTACTSPAM_SUCCESS':
      return { ...state, list: (state.list || []).filter(id => action.data.ids.indexOf(id) < 0)};
    case 'WMS_LIST_DELETE_SUCCESS': {
      const { wmsTickets = [], list = [] } = state;
      const { id = '' } = action.data;
      return { ...state, list: list.filter(entityId => entityId !== id),
        wmsTickets: wmsTickets.filter(ticketID => ticketID !== action.data.id)};
    }
    case 'LIST_OFFSET_SCROLL_REQUEST': {
      return { ...state, list: action.data.isRefresh ? [] : state.list};
    }
    case 'REMOVE_TICKET_FROM_LIST': {
      const { id } = action.data;
      const { list: oldList } = state;
      return { ...state, list: oldList.filter(ticketId => ticketId !== id)};
    }
    default:
      return state;
  }
};

const listViewOrder = (
  state = {
    all: [],
    starred: [],
    archived: []
  },
  { type, data = [] }
) => {
  switch (type) {
    case 'VIEW_SUCCESS': {
      const { result, moduleName } = data;
      if (moduleName === 'ticket') {
        /* NOTE:Temporary handling for splitting blueprint views */
        return { ...state, ...splitBluePrintViews(data)};
      }
      return { ...state, all: result,
        isAllViewFetched: true};
    }
    case 'VIEW_FAILURE': 
      return { ...state, isAllViewFetched: true};
    case 'STARREDVIEW_SUCCESS':
    case 'STARRED_VIEWS_REORDER_SUCCESS':
      return { ...state, starred: data.result,
        isStarViewFetched: true};
    case 'ARCHIVED_VIEW_SUCCESS':
      return { ...state, archived: data.result,
        isArchivedViewFetched: true};

    case 'UNARCHIVED_VIEW_SUCCESS': {
      return { ...state, archived: state.archived.filter(viewId => data.viewId !== viewId)};
    }
    case 'STARREDVIEW_UPDATE_SUCCESS':
      return { ...state, starred: data.list};
    case 'DELETE_ARCHIVED_VIEW_SUCCESS':
    case 'VIEW_DELETE_SUCCESS': {
      const all = state.all.filter(id => id !== data.id);
      const starred = state.starred.filter(id => id !== data.id);
      const archived = state.archived.filter(id => id !== data.id);
      return { ...state, all,
        starred,
        archived};
    }
    case 'VIEW_CREATE_SUCCESS': {
      return { ...state, all: [...state.all, data.id]};
    }
    case 'WMS_TICKETS_STARREDVIEW_COUNT_SUCCESS': {
      return { ...state, starredCount: { ...state.starredCount, ...data.count}};
    }
    case 'TICKETS_STARREDVIEW_COUNT_SUCCESS': {
      return { ...state, starredCount: data.count};
    }

    default:
      return state;
  }
};

export const listView = (UIStateInitial, mandatoryPref) => (
  state = {},
  action
) => {
  const { moduleName: moduleL } = action.data || {};
  switch (action.type) {
    case 'DEPARTMENT_SELECT':
      return {
        views: listViewOrder(state.views, action),
        viewMapper: state.viewMapper || {},
        viewUIState: ['default'].reduce((res, next) => {
          res[next] = listViewUIState(res[next], action, UIStateInitial);
          return res;
        }, state.viewUIState || {}),
        filters: state.filters || {},
        viewDetails: state.viewDetails || {},
        openedAccordions: null
      };

    case 'VIEW_SUCCESS': {
      const viewIds = action.data.result || [];
      const viewDetails = selectn(
        `data.entities[${action.data.moduleName}view]`,
        action
      );
      return { ...state, views: listViewOrder(state.views, action),
        viewMapper: { ...state.viewMapper, ...action.data.mapper},
        viewUIState: viewIds.reduce((res, next) => {
          res[next] = { ...listViewUIState(res[next], action, UIStateInitial)};
          return { ...res};
        }, state.viewUIState || {}),
        viewDetails};
    }
    case 'ARCHIVED_VIEW_SUCCESS': {
      const viewIds = action.data.result || [];
      return { ...state, views: listViewOrder(state.views, action),
        viewMapper: { ...state.viewMapper, ...action.data.mapper},
        viewUIState: viewIds.reduce((res, next) => {
          res[next] = listViewUIState(res[next], action, UIStateInitial);
          return res;
        }, state.viewUIState || {})};
    }

    case 'UNARCHIVED_VIEW_SUCCESS': {
      return { ...state, views: listViewOrder(state.views, action)};
    }

    case 'STARREDVIEW_UPDATE_SUCCESS': {
      const { views = {} } = state;
      const { starred = [] } = views;
      const { setMark, viewId } = action.data || {};
      const starred1 = setMark
        ? [...starred, viewId]
        : starred.filter(id => id !== viewId);
      return { ...state, views: { ...state.views, starred: starred1}};
    }
    case '@@router/URL_CHANGE':
    case 'CLEAR_ALL': {
      const viewIds = Object.keys(state.viewUIState || {});
      return { ...state, viewUIState: viewIds.reduce((res, next) => {
          res[next] = listViewUIState(res[next], action);
          return res;
        }, state.viewUIState || {})};
    }
    case 'GET_TABLE_SELECTED_FIELDS_SUCCESS':
    case 'UPDATE_TABLE_SELECTED_FIELDS_SUCCESS':
    case 'GET_TABLE_MY_SELECTED_FIELDS_SUCCESS':
    case 'LIST_OFFSET_SCROLL_SUCCESS':
    case 'LIST_OFFSET_SCROLL_NEXT_SUCCESS':
    case 'PREFERENCE_CHANGE':
    case 'DELETE_SUCCESS':
    case 'WMS_LIST_DELETE_SUCCESS':
    case 'WMS_LIST_ADD_SUCCESS':
    case 'CLEAR_WMS_LIST_SUCCESS':
    case 'CLEAR_ALL_WMS_LIST':
    case 'TICKET_LEFT_LIST_SUCCESS':
    case 'CONTACTSPAM_SUCCESS':
    case 'CONTACT_LEFT_LIST_SUCCESS':
    case 'REMOVE_TICKET_FROM_LIST':
      return { ...state, viewUIState: { ...state.viewUIState, [action.data.viewId]: listViewUIState(
            state.viewUIState[action.data.viewId],
            action,
            UIStateInitial,
            mandatoryPref
          )}};
    case 'STARREDVIEW_SUCCESS':
    case 'STARRED_VIEWS_REORDER_SUCCESS':
    case 'TICKETS_STARREDVIEW_COUNT_SUCCESS':
    case 'WMS_TICKETS_STARREDVIEW_COUNT_SUCCESS':
    case 'DELETE_ARCHIVED_VIEW_SUCCESS':
    case 'VIEW_DELETE_SUCCESS': {
      return { ...state, views: listViewOrder(state.views, action),
        viewMapper:
          action.type === 'VIEW_DELETE_SUCCESS' ||
          action.type === 'DELETE_ARCHIVED_VIEW_SUCCESS'
            ? Object.keys(state.viewMapper).reduce((res, viewSName) => {
              if (state.viewMapper[viewSName] !== action.data.id) {
                res[viewSName] = state.viewMapper[viewSName];
              }
              return res;
            }, {})
            : state.viewMapper || {}};
    }
    case 'VIEW_CREATE_SUCCESS': {
      const { sanitizedName, id, isCustomView } = action.data.res;
      return { ...state, views: listViewOrder(state.views, action),
        viewMapper: { ...state.viewMapper, [sanitizedName]: id},
        viewUIState: [id].reduce((res, next) => {
          res[next] = listViewUIState(res[next], action, UIStateInitial);
          return res;
        }, state.viewUIState || {}),
        viewDetails: { ...state.viewDetails, [id]: { isCustomView }}};
    }
    case 'LASTACCESS_VIEWS_SUCCESS': {
      // let { sanitizedName, id } = action.data.res;
      const id =
        action.data.result[
          `${moduleL === 'activities' ? moduleL : `${moduleL}s`}`
        ];
      const mapper = {
        [action.data.entities[`${moduleL}view`][id].sanitizedName]: id
      };

      return { ...state, views: listViewOrder(state.views, action),
        viewMapper: { ...state.viewMapper, ...mapper},
        viewUIState: { ...state.viewUIState, [id]: listViewUIState(
            (state.viewUIState || {}).id,
            action,
            UIStateInitial
          )},
        viewDetails: state.viewDetails};
    }
    case 'VIEW_UPDATE_SUCCESS': {
      const {
        sanitizedName,
        id,
        isCustomView,
        name,
        displayLabel
      } = action.data.res;
      let newViewMapper = state.viewMapper;
      newViewMapper = Object.keys(newViewMapper).reduce((res, next) => {
        if (newViewMapper[next] !== id) {
          res[next] = newViewMapper[next];
        }
        return res;
      }, {});
      return { ...state, viewMapper: { ...newViewMapper, [sanitizedName]: id},
        viewDetails: { ...state.viewDetails, [id]: { id, sanitizedName, name, displayLabel, isCustomView }}};
    }
    case 'UPDATE_FILTERS_SUCCESS': {
      return { ...state, filters: action.data.filters};
    }
    case 'LIST_OFFSET_SCROLL_REQUEST': {
      return { ...state, viewUIState: { ...state.viewUIState, [action.data.viewId]: listViewUIState(
            state.viewUIState[action.data.viewId],
            action,
            UIStateInitial,
            mandatoryPref
          )}};
    }

    case 'GET_PREFERENCE_SUCCESS': {
      let { perPage, sortBy, sorting, viewId } = action.data;

      // Unnecessary check due to unstable responses from API
      sortBy =
        sortBy === TICKET_INFO.SORT_CUSTOMER_RESPONSE_TIME
          ? TICKET_INFO.SORT_RECENTTHREAD
          : sortBy === TICKET_INFO.SORT_RESPONSE_DUEDATE
            ? TICKET_INFO.SORT_DUEDATE
            : sortBy;

      return { ...state, viewUIState: { ...state.viewUIState, [viewId]: {
            preference: { perPage, sortBy, sorting }
          }}};
    }

    case 'CLEAR_ACCORDIONS': 
      return { ...state, openedAccordions: null};
    case 'SET_ACCORDIONS': 
      return { ...state, openedAccordions: selectn('data.values', action || {}) || state.openedAccordions};
    case 'UPDATE_PREFERENCE_SUCCESS':
      return state;

    default:
      return state;
  }
};
