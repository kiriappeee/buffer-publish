import {
  SHOW_NOTIFICATION
 } from '../reducers/';

const middleware = store => next => (action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      new buffer.View.Notice({
        model: new Backbone.Model({
          message: action.message,
          style: action.style
        })
      });
    default:
      return next(action);
  }
};

export default middleware;
