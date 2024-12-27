"use client";

import ModelLoading from "@/components/common/ModelLoading";
import apiRequest from "@/lib/fetchApi";
import { UserType } from "@/types/User.type";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user?: UserType;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiRequest.get("/user/current");
        setUser(res.data);
        setIsLogin(true);
      } catch (error: unknown) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        loading,
        setLoading,
        isLogin,
        setIsLogin,
        setUser,
      }}
    >
      {loading && (
        <div className="fixed z-[1000] top-0 left-0 w-full h-full bg-white flex flex-col gap-4 items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-8 w-8 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-8 w-8 bg-blue-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
      <ModelLoading />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
