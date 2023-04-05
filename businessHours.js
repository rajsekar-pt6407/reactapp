export const businessHours = (state = null, { type, data }) => {
  switch (type) {
    case "GET_BUSINESSHOURS_SUCCESS":
      return data;
    default:
      return state;
  }
};
