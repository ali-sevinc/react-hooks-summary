import Auth from "./components/Auth";
import Ingredients from "./components/Ingredients/Ingredients";
import { useAuthContext } from "./context/auth-context";
import ModalContextProvider from "./context/modal-context";

export default function App() {
  const { isAuth } = useAuthContext();

  if (!isAuth) return <Auth />;
  return (
    <ModalContextProvider>{isAuth && <Ingredients />}</ModalContextProvider>
  );
}
