import React, { useContext } from "react";
import PropTypes from "prop-types";
import RecipeContext from "../../context/recipe/recipeContext";

const RecipeItem = ({ recipe }) => {
  const recipeContext = useContext(RecipeContext);
  const { deleteRecipe, setCurrent, clearCurrent } = recipeContext;

  const {
    id,
    name,
    numberofservings,
    cookingtime,
    ingredients,
    preparationsteps,
  } = recipe;

  const onDelete = () => {
    deleteRecipe(id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">{name}</h3>
      <ul className="list">
        {numberofservings && (
          <li>
            <i className="fas fa-pizza-slice"></i> {numberofservings}
          </li>
        )}
        {cookingtime && (
          <li>
            <i className="far fa-clock"></i> {cookingtime}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm">Edit</button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeItem;
