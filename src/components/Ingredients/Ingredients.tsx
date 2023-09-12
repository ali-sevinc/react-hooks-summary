import { useCallback, useMemo, useState } from "react";

import { useModalContext } from "../../context/modal-context";
import { useAuthContext } from "../../context/auth-context";

import useAddIngredient from "./useAddIngredient";
import useHttp from "../../hooks/useHttp";
// import useDeleteIngredient from "./useDeleteIngredient";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

import Ingredient from "../../models/ingredient";
import ErrorModal from "../UI/ErrorModal";

function Ingredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);

  const { isShown, handleCloseModal, message, handleShowModal } =
    useModalContext();

  const { addIngredient, isLoading: addLoading } = useAddIngredient();

  /*used useHttp hook insteat of useDeketeIngredient*/
  //const { removeIngridient } = useDeleteIngredient();

  const { handleLogout } = useAuthContext();

  const {
    sendRequest,
    error: useHttpError,
    isLoading: useHttpLoading,
    handleClear,
  } = useHttp();

  async function handleAddIngredient(data: { title: string; amount: number }) {
    setFetchLoading(true);
    const name: string = await addIngredient(data);
    setFetchLoading(false);
    setIngredients((prev) => [
      ...prev,
      { title: data.title, amount: data.amount, id: name },
    ]);
  }

  const handleDeleteIngredient = useCallback(
    async function handleDeleteIngredient(id: string) {
      await sendRequest({ method: "DELETE", id });
      if (useHttpError) return handleShowModal("Deleting ingredient failed!");
      setIngredients((prev) => prev.filter((item) => item.id !== id));
    },
    [sendRequest, useHttpError, handleShowModal]
  );

  const handleSearch = useCallback(function (data: Ingredient[]) {
    setIngredients(data);
  }, []);

  function handleClearError() {
    handleCloseModal();
    handleClear();
  }

  const ingredientsList = useMemo(() => {
    return (
      <IngredientList
        isLoading={useHttpLoading}
        fetchLoading={fetchLoading}
        ingredients={ingredients}
        onRemoveItem={handleDeleteIngredient}
      />
    );
  }, [fetchLoading, ingredients, handleDeleteIngredient, useHttpLoading]);

  if (isShown)
    return (
      <ErrorModal onClose={handleClearError}>
        {message && <p>{message}</p>}
      </ErrorModal>
    );

  return (
    <div className="App">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <IngredientForm
        onAddIngredient={handleAddIngredient}
        isLoading={addLoading}
      />

      <section>
        <Search onSearch={handleSearch} setFetchLoading={setFetchLoading} />

        {ingredientsList}
      </section>
    </div>
  );
}

export default Ingredients;
