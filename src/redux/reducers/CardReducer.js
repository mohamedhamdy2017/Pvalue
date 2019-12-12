import jsonData from '../../service/data.json';
import {DELETECARD} from '../actions/types';

const initialState = {
  items: jsonData.accounts[0].boards[0].tasks[0].state,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case DELETECARD:
      return {
        ...state,
        items: state.items.filter(element => element.id != action.payload),
      };
    default:
      return state;
  }
};
