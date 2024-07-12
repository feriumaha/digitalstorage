import { createContext, useContext, useEffect, useState } from "react";
import supabase from "./supabaseClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        // console.log('Fetched session:', session);
        if (session) {
          setUser(session.user);
          setIsAuthenticated(true);
        }
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log('Auth state change event:', event);
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setIsAuthenticated(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;