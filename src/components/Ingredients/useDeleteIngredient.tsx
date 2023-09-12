import { useModalContext } from "../../context/modal-context";
import { deleteData } from "../../helpers/apis";

export default function useDeleteIngredient() {
  const { handleShowModal } = useModalContext();

  async function removeIngridient(id: string) {
    const error = await deleteData(id);
    if (error) {
      handleShowModal(error);
    }
  }
  return { removeIngridient };
}
