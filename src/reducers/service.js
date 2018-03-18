import {
  SERVICE_START,
  SERVICE_END
} from '../actions/types';

const initialState = {
  inService: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SERVICE_START:
      return {
        ...state,
        inService: true
      }
    case SERVICE_END:
      return {
        ...state,
        inService: false
      }
    default:
      return state
  }
}
