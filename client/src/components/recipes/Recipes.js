import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import RecipeItem from "./RecipeItem";
import Spinner from "../layout/Spinner";
import RecipeContext from "../../context/recipe/recipeContext";

const Recipes = () => {
  const recipeContext = useContext(RecipeContext);

  const { recipes, filtered, getRecipes, loading } = recipeContext;

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line
  }, []);

  if (recipes !== null && recipes.length === 0 && !loading) {
    return <h4>Please add recipe</h4>;
  }

  return (
    <Fragment>
      {recipes !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((recipe) => (
                <CSSTransition key={recipe._id} timeout={500} classNames="item">
                  <RecipeItem recipe={recipe} />
                </CSSTransition>
              ))
            : recipes.map((recipe) => (
                <CSSTransition key={recipe._id} timeout={500} classNames="item">
                  <RecipeItem recipe={recipe} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Recipes;
