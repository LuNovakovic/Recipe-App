import React, { useState, useContext } from "react";
import RecipeContext from "../../context/recipe/recipeContext";

const RecipeForm = () => {
  const recipeContext = useContext(RecipeContext);

  const [recipe, setRecipe] = useState({
    name: "",
    numberofservings: "",
    cookingtime: "",
  });

  const { name, numberofservings, cookingtime } = recipe;

  const onChange = (e) =>
    setRecipe({ ...recipe, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    recipeContext.addRecipe(recipe);
    setRecipe({
      name: "",
      numberofservings: "",
      cookingtime: "",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add Recipe</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Number of servings"
        name="numberofservings"
        value={numberofservings}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Cooking time"
        name="cookingtime"
        value={cookingtime}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value="Add Recipe"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default RecipeForm;
