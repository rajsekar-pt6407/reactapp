/* eslint-disable func-names */
/* eslint-disable no-nested-ternary */

/** * Methods ** */
import { createFilteredReducer, arraySet } from '../_utils/CommonUtils';

/** * Constants ** */
import { moduleConst } from '../_constants';

const customerLookup = (state = { startsWith: '' }, { type, data } = {}) => {
  switch (type) {
    case 'LOOKUP_DATA_SUCCESS': {
      const { startsWith } = data;
      return { ...state, startsWith };
    }
    case 'CLEAR_LOOKUP_DATA': {
      return { ...state, startsWith: '' };
    }
    default:
      return state;
  }
};

const productLookupInitialState = {
  accountId: '',
  contactId: ''
};

const productLookupData = (
  state = productLookupInitialState /* ALL, RELATED */,
  { type, data } = {}
) => {
  switch (type) {
    case 'LOOKUP_DATA_SUCCESS': {
      const { accountId, contactId } = data;
      return { ...state, accountId, contactId };
    }
    case 'CLEAR_LOOKUP_DATA': {
      return { ...state, accountId: '', contactId: '' };
    }
    default:
      return state;
  }
};

const ticketLookupData = (state = { viewId: '' }, { type, data } = {}) => {
  switch (type) {
    case 'LOOKUP_DATA_SUCCESS': {
      const { viewId } = data;
      return { ...state, viewId };
    }
    case 'CLEAR_LOOKUP_DATA': {
      return { ...state, viewId: '' };
    }
    default:
      return state;
  }
};

const twitterLookupData = (state = { data: [] }, { type } = {}) => {
  switch (type) {
    case 'CLEAR_LOOKUP_DATA': {
      return { ...state, data: [] };
    }
    default:
      return state;
  }
};

const lookupInitialState = {
  searchStr: '',
  data: [],
  isFetching: false,
  isNextData: false,
  from: 0,
  isError: false,
  errorType: '' // FORBIDDEN
};

const getOtherData = (type, data) => {
  const { moduleName } = data;

  const isCustomerModule = !!(
    moduleName === moduleConst.ACCOUNT_L || moduleName === moduleConst.CONTACT_L
  );
  const isProductModule = moduleName === moduleConst.PRODUCT_L;
  const isTicketModule = moduleName === moduleConst.TICKET_L;
  const isTwitter = moduleName === moduleConst.TWITTER_L;

  const newData = isCustomerModule
    ? customerLookup(null, { type, data })
    : isProductModule
      ? productLookupData(null, { type, data })
      : isTicketModule
        ? ticketLookupData(null, { type, data })
        : isTwitter
          ? twitterLookupData(null, { type })
          : {};

  return newData;
};

const lookupData = (state = lookupInitialState, { type, data } = {}) => {
  switch (type) {
    case 'LOOKUP_DATA_SUCCESS': {
      const { from, limit, result, isNextData, searchStr } = data;
      const { data: oldData } = state;

      const updatedFrom = from ? from - 1 : 0;
      const doubleLimit = limit * 2 > 200 ? 200 : limit * 2;
      const to = updatedFrom + doubleLimit;
      let newList = arraySet(oldData.slice(0, updatedFrom), result);
      newList = isNextData
        ? arraySet(newList, oldData.slice(to, oldData.length))
        : newList;

      const newData = getOtherData(type, data);

      const newState = {
        from,
        searchStr,
        data: newList,
        isNextData,
        isFetching: false,
        isError: false,
        errorType: '',
        ...newData
      };

      return { ...state, ...newState };
    }
    case 'LOOKUP_DATA_REQUEST': {
      const { from } = data;
      const { data: oldData } = state;
      return {
        ...state,
        isFetching: true,
        data: from === 0 || from === 1 ? [] : oldData,
        from
      };
    }

    case 'LOOKUP_DATA_FAILURE': {
      const { errorCode, from } = data;
      const isInitialFetch = from === 0 || from === 1;
      return {
        ...state,
        isFetching: false,
        errorCode,
        isError: !!isInitialFetch
      };
    }

    case 'CLEAR_LOOKUP_DATA': {
      const newData = getOtherData(type, data);
      return { ...state, ...newData };
    }

    default:
      return state;
  }
};

const lookupStateReducerPredict = function (moduleName, action = {}) {
  return action.data && action.data.moduleName === moduleName;
};

export const accountLookup = createFilteredReducer(lookupData, (action) =>
  lookupStateReducerPredict(moduleConst.ACCOUNT_L, action)
);

export const contactLookup = createFilteredReducer(lookupData, (action) =>
  lookupStateReducerPredict(moduleConst.CONTACT_L, action)
);

export const productLookup = createFilteredReducer(lookupData, (action) =>
  lookupStateReducerPredict(moduleConst.PRODUCT_L, action)
);

export const ticketLookup = createFilteredReducer(lookupData, (action) =>
  lookupStateReducerPredict(moduleConst.TICKET_L, action)
);
export const twitterLookup = createFilteredReducer(lookupData, (action) =>
  lookupStateReducerPredict(moduleConst.TWITTER_L, action)
);