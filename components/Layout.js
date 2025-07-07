import { useAuth } from "../context/AuthContext";
import Header from "./Header";

export default function Layout({ children }) {

  const { currentUser } = useAuth();

  return (
    <>
      { currentUser && <Header /> }
      <main className="app-container">{children}</main>
    </>
  );
}
