import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import firebase_app from "@/firebase/config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Shell } from "lucide-react";

const auth = getAuth(firebase_app);

export const AuthContext = createContext({
  user: { id: "", email: "", displayName: "", photoURL: "" },
  logout: () => { },
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push("/"); // Redirect to login if not authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/"); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {loading ? (
        <div className="loading-container">
          <Shell className="w-5 h-5 animate-spin" />
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
};