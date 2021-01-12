import React from "react";
import Recipes from "../recipes/Recipes";
import RecipeForm from "../recipes/RecipeForm";

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <RecipeForm></RecipeForm>
      </div>
      <div>
        <Recipes />
      </div>
    </div>
  );
};

export default Home;
