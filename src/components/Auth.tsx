import Card from "./UI/Card";
import "./Auth.css";
import { useAuthContext } from "../context/auth-context";

function Auth() {
  const { handleLogin } = useAuthContext();

  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={handleLogin}>Log In</button>
      </Card>
    </div>
  );
}

export default Auth;
