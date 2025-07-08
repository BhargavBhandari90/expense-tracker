import "../styles/globals.css";
import "../styles/App.css";
import "../styles/Header.css";
import "../styles/MonthlyExpensesPage.css";
import "../styles/Loader.css";

import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
        <Head>
          <title>Daily Expense Tracker</title>
        </Head>
        <Layout>
            <Component {...pageProps} />
            <ToastContainer />
        </Layout>
    </AuthProvider>
  );
}
