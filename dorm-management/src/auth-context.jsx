import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useRefresh } from "./services/auth-services";

const AuthContext = createContext(null);

const defaultValue = {
  accessToken: null,
  role: null,
  name: null,
  username: null,
  userID: null,
};

export const AuthProvider = ({ children }) => {
  const { refreshToken } = useRefresh();
  const [auth, setAuth] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;

    const fetchRefresh = async () => {
      try {
        const tokenData = await refreshToken();

        if (tokenData) {
          setAuth({
            accessToken: tokenData.accessToken,
            role: tokenData.role,
            name: tokenData.staffName,
            username: tokenData.username,
            email: tokenData.username,
            userID: tokenData.userID,
          });
        } else {
          setAuth(defaultValue);
        }

        return tokenData;
      } catch (err) {
        console.error("Failed to refresh token:", err);
        setAuth(defaultValue);
      } finally {
        setLoading(false);
      }
    };

    const setupAutoRefresh = async () => {
      const tokenData = await fetchRefresh();
      if (!tokenData || !tokenData.accessToken) return;

      try {
        const payload = JSON.parse(atob(tokenData.accessToken.split(".")[1]));

        const exp = payload.exp * 1000;
        const now = Date.now();

        // Refresh 1 minute before expiry
        const refreshTime = exp - now - 60 * 1000;

        if (refreshTime > 0) {
          timeoutId = setTimeout(fetchRefresh, refreshTime);
        }
      } catch (err) {
        console.error("Invalid JWT token:", err);
      }
    };

    setupAutoRefresh();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook (JS-safe)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
