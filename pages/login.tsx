import { useRouter } from "next/router";
import React, { useEffect } from "react";
import LoginContainer from "../container/loginContainer";
import { useStore } from "../store";

const LoginPage = () => {
  const { isLoggedIn, user } = useStore();
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return <LoginContainer />;
};

export default LoginPage;
