import { useAuth } from "../context/AuthContext";
import LoginPage from "./login";
import DailyExpensesPage from "./daily";

export default function HomePage() {

  const { currentUser } = useAuth();

  return(
    <>
      { !currentUser ? (<LoginPage />) : (<DailyExpensesPage />) }
    </>
  );
}
