
export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line
  next(action);
  switch (action.type) {
    default:
      break;
  }
};
