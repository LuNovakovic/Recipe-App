import {
  ADD_RECIPE,
  DELETE_RECIPE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_RECIPE,
  FILTER_RECIPES,
  CLEAR_FILTER,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    default:
      return state;
  }
};