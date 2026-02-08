import { createContext, useContext, useEffect, useState } from "react";
import { getMyProfile } from "../services/operations/profileapi";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await getMyProfile();
      setUser(res.data);
    } catch (error) {
      console.error("Fetch user failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Proper debug log
  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
