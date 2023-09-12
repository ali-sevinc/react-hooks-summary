import { useEffect, useState } from "react";
import { useModalContext } from "../../context/modal-context";
import { getData } from "../../helpers/apis";

import Ingredient from "../../models/ingredient";

export default function useGetIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleShowModal } = useModalContext();

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        const { convertedData, error } = await getData();
        if (error) {
          handleShowModal("Fetching ingredients data failed!");
        } else {
          setIngredients(convertedData);
        }
        setIsLoading(false);
      }
      fetchData();
    },
    [handleShowModal]
  );

  return { ingredients, isLoading };
}
