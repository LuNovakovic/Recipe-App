import React, { Fragment, useContext } from "react";
import RecipeItem from "./RecipeItem";
import RecipeContext from "../../context/recipe/recipeContext";

const Recipes = () => {
  const recipeContext = useContext(RecipeContext);

  const { recipes } = recipeContext;

  return (
    <Fragment>
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </Fragment>
  );
};

export default Recipes;
