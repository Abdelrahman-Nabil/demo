import { SET_DATA } from '../actions/types'

const INITIAL_STATE = []
export const dataReducer  = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DATA:
      return action.payload
    default:
      return state
  }
}
