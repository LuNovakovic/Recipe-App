import React, { useReducer } from "react";
import axios from "axios";
import RecipeContext from "./recipeContext";
import recipeReducer from "./recipeReducer";
import {
  GET_RECIPES,
  ADD_RECIPE,
  DELETE_RECIPE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_RECIPE,
  FILTER_RECIPES,
  CLEAR_RECIPES,
  CLEAR_FILTER,
  RECIPE_ERROR,
} from "../types";

const RecipeState = (props) => {
  const initialState = {
    recipes: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Get Recipes
  const getRecipes = async () => {
    try {
      const res = await axios.get("/api/recipes");

      dispatch({
        type: GET_RECIPES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Recipe
  const addRecipe = async (recipe) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/recipes", recipe, config);

      dispatch({
        type: ADD_RECIPE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete recipe
  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`/api/recipes/${id}`);

      dispatch({
        type: DELETE_RECIPE,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update Recipe
  const updateRecipe = async (recipe) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/recipes/${recipe._id}`, recipe, config);

      dispatch({
        type: UPDATE_RECIPE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Clear recipes
  const clearRecipes = () => {
    dispatch({ type: CLEAR_RECIPES });
  };

  // Set Current Recipe
  const setCurrent = (recipe) => {
    dispatch({ type: SET_CURRENT, payload: recipe });
  };

  // Clear Current Recipe
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Contacts
  const filterRecipes = (text) => {
    dispatch({ type: FILTER_RECIPES, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes: state.recipes,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addRecipe,
        deleteRecipe,
        setCurrent,
        clearCurrent,
        updateRecipe,
        filterRecipes,
        clearFilter,
        getRecipes,
        clearRecipes,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
