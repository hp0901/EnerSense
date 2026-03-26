import { createContext, useContext, useEffect, useState } from "react";
import { getMyProfile } from "../services/operations/profileapi";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const res = await getMyProfile();
      const userData = res.data;

      setUser(userData);

      // 🔥 Check premium validity
      const premiumActive =
        userData?.premiumExpiresAt &&
        new Date(userData.premiumExpiresAt) > new Date();

      setIsPremium(premiumActive);

      localStorage.setItem("user", JSON.stringify(userData));

    } catch (error) {
      console.error("Fetch user failed:", error);
      setUser(null);
      setIsPremium(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUser();
    } else {
      setUser(null);
      setIsPremium(false);
      setLoading(false);
    }

  }, [localStorage.getItem("token")]);

  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, fetchUser, isPremium }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);