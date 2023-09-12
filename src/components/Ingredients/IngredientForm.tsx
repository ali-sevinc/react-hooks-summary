import React, { ChangeEvent, FormEvent, useState } from "react";

import Card from "../UI/Card";

import "./IngredientForm.css";

interface PropType {
  onAddIngredient: (data: { title: string; amount: number }) => void;
  isLoading: boolean;
}

const IngredientForm = React.memo(function ({
  onAddIngredient,
  isLoading,
}: PropType) {
  const [inputValues, setInputValues] = useState({
    title: "",
    amount: "",
  });

  function submitHandler(event: FormEvent) {
    event.preventDefault();
    const title = inputValues.title;
    const amount = Number(inputValues.amount);
    if (title.length === 0 || isNaN(amount) || amount <= 0) return;
    const enteredData = {
      title,
      amount,
    };
    onAddIngredient(enteredData);
    setInputValues({ title: "", amount: "" });
  }

  function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setInputValues((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              name="title"
              value={inputValues.title}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={inputValues.amount}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="ingredient-form__actions">
            <button disabled={isLoading} type="submit">
              Add Ingredient
            </button>
            {isLoading && <span>Adding new ingredient...</span>}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
