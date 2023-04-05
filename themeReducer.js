export const themeReducer = (state = {}, { type, data }) => {
  switch (type) {
    case 'UPDATE_APP_PREFERENCE':
      return { ...state, ...data };
    default:
      return state;
  }
};
