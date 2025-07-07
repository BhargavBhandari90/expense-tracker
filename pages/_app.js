import "../styles/globals.css";
import "../styles/App.css";
import "../styles/Header.css";
import "../styles/MonthlyExpensesPage.css";
import "../styles/Loader.css";

import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </AuthProvider>
  );
}
