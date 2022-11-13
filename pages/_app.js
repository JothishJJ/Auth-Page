import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";

import { AuthProvider } from "../lib/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="background">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
