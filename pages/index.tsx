import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HomeContainer from "../container/HomeContainer";
import HomepageUnloggedIn from "../container/HomeContainer/unAuthen";
import { useStore } from "../store";

export default function Home() {
  const [logged, setLogged] = useState(false);
  const {
    listBook,
    getAllBook,
    isSuccess,
    success,
    setIsSuccess,
    isError,
    errorMessage,
    setIsError,
    isLoggedIn,
  } = useStore();

  const [listBookData, setListBookData] = useState([]);

  useEffect(() => {
    getAllBook();
  }, []);

  useEffect(() => {
    if (listBook) {
      setListBookData(listBook);
    }
  }, [listBook]);
  useEffect(() => {
    if (isLoggedIn) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(success, {
        position: "top-center",
      });
    }
    setIsSuccess(false);
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
    setIsError(false);
  }, [isError]);
  if (logged) return <HomeContainer listBookData={listBookData} />;
  return <HomepageUnloggedIn listBookData={listBookData} />;
}
