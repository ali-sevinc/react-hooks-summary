import LoadingIndicator from "../UI/LoadingIndicator";

import Ingredient from "../../models/ingredient";

import "./IngredientList.css";

interface PropType {
  ingredients: Ingredient[];
  onRemoveItem: (id: string) => void;
  fetchLoading: boolean;
  isLoading: boolean;
}

function IngredientList({
  ingredients,
  onRemoveItem,
  fetchLoading,
  isLoading,
}: PropType) {
  return (
    <section className="ingredient-list">
      {fetchLoading || isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <h2>Loaded Ingredients</h2>
          {ingredients.length === 0 && <h3>No Ingredients found</h3>}
          {!fetchLoading && (
            <ul>
              {ingredients.map((item) => (
                <li key={item.id} onClick={() => onRemoveItem(item.id)}>
                  <span>{item.title}</span>
                  <span>{item.amount}x</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

export default IngredientList;
