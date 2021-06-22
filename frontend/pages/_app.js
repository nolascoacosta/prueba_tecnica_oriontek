import '../styles/globals.css'
import AppState from "../context/app/appState";
import AuthState from "../context/auth/authState";
import BusinessState from "../context/business/businessState";
import AppLayout from "../components/AppLayout";
function MyApp({ Component, pageProps }) {
  return (
      <AppState>
        <AuthState>
            <BusinessState>
                <AppLayout>
                    <Component {...pageProps} />
                </AppLayout>
            </BusinessState>
        </AuthState>
      </AppState>
  );
}

export default MyApp
