import { useState, useCallback } from "react";
import { useModalContext } from "../../context/modal-context";
import { getData } from "../../helpers/apis";

export default function useSearch() {
  const { handleShowModal } = useModalContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSerchValue = useCallback(
    async function handleSerchValue(searchValue: string) {
      setIsLoading(true);
      const { error, convertedData } = await getData(searchValue);
      if (error) handleShowModal("Searching data failed!");
      setIsLoading(false);
      return { error, convertedData };
    },
    [handleShowModal]
  );

  return { handleSerchValue, isLoading };
}
