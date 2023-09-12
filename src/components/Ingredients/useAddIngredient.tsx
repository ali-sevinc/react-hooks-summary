import { useState } from "react";
import { useModalContext } from "../../context/modal-context";
import { addData } from "../../helpers/apis";

export default function useAddIngredient() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleShowModal } = useModalContext();

  async function addIngredient(data: { title: string; amount: number }) {
    setIsLoading(true);
    const { error, fetchData } = await addData(data);
    if (error) handleShowModal("Creating new ingridient failed!");
    setIsLoading(false);
    return fetchData;
  }
  return { addIngredient, isLoading };
}
