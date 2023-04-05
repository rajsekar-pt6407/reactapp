const inferenceData = (state = [], action = {}) => {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_TICKET_INFERENCE_PREDICTORS_SUCCESS': {
      const { fields, from } = data;
      return from === 1 ? fields : [...state, ...fields];
    }
    case 'UPDATE_TICKET_MANUAL_INFERENCE_PREDICTORS_SUCCESS': {
      const { payload } = data;
      const { cf, ...otherFields } = payload;
      const apiNameMap = { ...cf, ...otherFields };
      return state.map((field) => {
        const { predictions } = field;
        const newPredictions = predictions.map((prediction) => {
          const { apiName } = prediction;
          if (apiNameMap.hasOwnProperty(apiName)) {
            return Object.assign({}, prediction, { status: 'UPDATED' });
          }
          return prediction;
        });
        return Object.assign({}, field, { predictions: newPredictions });
      });
    }
    default:
      return state;
  }
};

const ticketInferences = (state = {}, action = {}) => {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_TICKET_INFERENCE_PREDICTORS_SUCCESS': {
      const { inferenceType } = data;
      if (inferenceType === 'SAVE_FIELD') {
        return {
          ...state,
          autoSavedFields: inferenceData(state.autoSavedFields, action)
        };
      } else if (inferenceType === 'MANUAL') {
        return {
          ...state,
          manualUpdatedFields: inferenceData(state.manualUpdatedFields, action)
        };
      }
      return state;
    }
    case 'UPDATE_TICKET_MANUAL_INFERENCE_PREDICTORS_SUCCESS': {
      return {
        ...state,
        manualUpdatedFields: inferenceData(state.manualUpdatedFields, action)
      };
    }
    case 'GET_TICKET_INFERENCE_PREDICTOR_COUNT_SUCCESS': {
      const { countInfo } = data;
      const { inferenceCount, totalInferenceCount } = countInfo;
      let countData = inferenceCount.reduce((totalObj, { count, value }) => {
        totalObj[value] = count;
        return totalObj;
      }, {});
      countData.totalInferenceCount = totalInferenceCount;
      return { ...state, inferenceCount: countData };
    }
    default:
      return state;
  }
};

const inferences = (state = {}, action = {}) => {
  const { data = {} } = action;
  const { ticketId } = data;
  return {
    ...state,
    [ticketId]: ticketInferences(state[ticketId], action)
  };
};

export const customPredictors = (state = {}, action = {}) => {
  const { type, data } = action;

  switch (type) {
    case 'GET_CUSTOM_PREDICTOR_STATUS_SUCCESS': {
      const { status } = data;
      return Object.assign({}, state, { isEnabled: status });
    }
    case 'GET_TICKET_INFERENCE_PREDICTOR_COUNT_SUCCESS':
    case 'GET_TICKET_INFERENCE_PREDICTORS_SUCCESS':
    case 'UPDATE_TICKET_MANUAL_INFERENCE_PREDICTORS_SUCCESS': {
      return {
        ...state,
        inferences: inferences(state.inferences, action)
      };
    }
    default:
      return state;
  }
};

export const customPredictionsData = (state = {}, action = {}) => {
  const { type, data } = action;

  switch (type) {
    case 'GET_PREDICTORS_LIST_SUCCESS': {
      let { fromIndex, filter, entities, result = [] } = data;

      const { status = 'ALL' } = filter;

      let {
        predictors = {},
        allIds = [],
        activeIds = [],
        inActiveIds = []
      } = state;

      if (status === 'ALL') {
        allIds =
          fromIndex === 1 ? result : [...new Set([...allIds, ...result])];
      } else if (status === 'ACTIVE') {
        activeIds =
          fromIndex === 1 ? result : [...new Set([...activeIds, ...result])];
      } else if (status === 'INACTIVE') {
        inActiveIds =
          fromIndex === 1 ? result : [...new Set([...inActiveIds, ...result])];
      }

      return Object.assign({}, state, {
        predictors: Object.assign({}, predictors, entities.predictors),
        allIds,
        activeIds,
        inActiveIds,
        filterType: status,
        listFetchedTime: Date.now()
      });
    }
    default:
      return state;
  }
};
