import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import RecipeContext from "./recipeContext";
import recipeReducer from "./recipeReducer";
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_RECIPE,
  FILTER_RECIPES,
  CLEAR_FILTER,
} from "../types";
import recipeContext from "./recipeContext";

const RecipeState = (props) => {
  const initialState = {
    recipes: [
      {
        id: 1,
        name: "Deep-fried Deviled Eggs Recipe by Tasty",
        numberofservings: "2",
        cookingtime: "5 min",
        ingredients:
          "Refrigerated 12 Eggs, hard 3 Eggs, Condiments, 1 tsp Hot sauce, 4 tbsp Mayonnaise, Baking & Spices, 1 cup Flour, 1 Paprika, 1 Pepper, 1 Salt",
        preparationsteps: "Cook eggs beforehand, later use topings you desire",
      },
      {
        id: 2,
        name: "Deep-fried Deviled Eggs Recipe by Tasty",
        numberofservings: "2",
        cookingtime: "5 min",
        ingredients:
          "Refrigerated 12 Eggs, hard 3 Eggs, Condiments, 1 tsp Hot sauce, 4 tbsp Mayonnaise, Baking & Spices, 1 cup Flour, 1 Paprika, 1 Pepper, 1 Salt",
        preparationsteps: "Cook eggs beforehand, later use topings you desire",
      },
      {
        id: 3,
        name: "Deep-fried Deviled Eggs Recipe by Tasty",
        numberofservings: "2",
        cookingtime: "5 min",
        ingredients:
          "Refrigerated 12 Eggs, hard 3 Eggs, Condiments, 1 tsp Hot sauce, 4 tbsp Mayonnaise, Baking & Spices, 1 cup Flour, 1 Paprika, 1 Pepper, 1 Salt",
        preparationsteps: "Cook eggs beforehand, later use topings you desire",
      },
    ],
    current: null,
  };

  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Add Recipe
  const addRecipe = (recipe) => {
    recipe.id = uuidv4(); //here
    dispatch({
      type: ADD_RECIPE,
      payload: recipe,
    });
  };

  // Delete Recipe
  const deleteRecipe = (id) => {
    dispatch({
      type: DELETE_RECIPE,
      payload: id,
    });
  };

  // Set Current Recipe
  const setCurrent = (recipe) => {
    dispatch({
      type: SET_CURRENT,
      payload: recipe,
    });
  };

  // Clear Current Recipe
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  // Update Recipe

  // Filter Recipes

  // Clear Filter

  return (
    <RecipeContext.Provider
      value={{
        recipes: state.recipes,
        addRecipe,
        deleteRecipe,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
