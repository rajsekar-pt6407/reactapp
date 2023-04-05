const createDepartmentSpecificState = (fn) => (state = {}, action) => {
  if (action.data && action.data.deptId) {
    const { deptId } = action.data;
    return { ...state, [deptId]: fn(state[deptId], action) };
  }
  return state;
};

export default createDepartmentSpecificState;
