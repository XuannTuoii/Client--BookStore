import { AxiosResponse } from "axios";
import { SetState, StateCreator, StoreApi } from "zustand";
import { getStore } from ".";
import { ApiService } from "../global/config/api/ApiService";

export interface IBookSlice {
  listBook: any;
  book: any;
  listComment: any;
  getAllBook: () => Promise<void>;
  getABook: (payload: any) => Promise<void>;
  updateBook: (payload: any) => Promise<void>;
  deleteBook: (payload: any) => Promise<void>;
  addBook: (payload: any) => Promise<void>;
  getAllComment: (payload: any) => Promise<void>;
}

const BookSlice: StateCreator<IBookSlice> | StoreApi<IBookSlice> = (set) => ({
  listBook: [],
  book: {},
  listComment: [],
  getAllBook: async () => {
    const { setIsError, setErrorMessage } = getStore();
    try {
      const api = new ApiService();
      const res: AxiosResponse = await api.getAllBook({});
      setIsError(false);
      set({
        listBook: res.data,
      });
    } catch (error: any) {
      setIsError(true);
      // setErrorMessage(error.response.data.message);
    }
  },
  getABook: async (payload: any) => {
    const { setIsError, setErrorMessage } = getStore();
    try {
      const api = new ApiService();
      const res: AxiosResponse = await api.getABook({
        pathParams: { slug: payload.slug },
      });

      setIsError(false);
      set({
        book: res.data,
      });
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  },
  updateBook: async (payload: any) => {
    const {
      setSuccess,
      setIsError,
      setIsSuccess,
      setErrorMessage,
      getAllBook,
    } = getStore();
    try {
      const api = new ApiService();
      const res: AxiosResponse = await api.updateBook({
        pathParams: { slug: payload.slug },
        data: {
          name: payload.name,
          author: payload.author,
          type: payload.type,
          pageCount: payload.pageCount,
          publishedDate: payload.publishedDate,
          description: payload.description,
          imgSrc: payload.imgSrc,
        },
      });

      setIsSuccess(true);
      setSuccess("Update book successfully");
      getAllBook();
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  },
  deleteBook: async (payload: any) => {
    const {
      setSuccess,
      setIsError,
      setIsSuccess,
      setErrorMessage,
      getAllBook,
    } = getStore();
    try {
      const api = new ApiService();
      const res: AxiosResponse = await api.deleteBook({
        pathParams: { slug: payload.slug },
        data: {
          public_id: payload.public_id,
        },
      });
      if (res.data) {
        setIsSuccess(true);
        setSuccess("Delete book successfully");
      }
      getAllBook();
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  },
  addBook: async (payload: any) => {
    const { setSuccess, setIsError, setIsSuccess, setErrorMessage } =
      getStore();
    try {
      const api = new ApiService();
      const res: AxiosResponse = await api.addBook({
        data: {
          name: payload.newBook.name,
          author: payload.newBook.author,
          type: payload.newBook.type,
          pageCount: payload.newBook.pageCount,
          publishedDate: payload.newBook.publishedDate,
          imgSrc: payload.newBook.imgSrc,
          description: payload.newBook.description,
        },
      });
      setIsSuccess(true);
      setSuccess("Add book successfully");
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  },
  getAllComment: async (payload: any) => {
    const { setIsError, setErrorMessage } = getStore();
    try {
      const api = new ApiService();
      const res: AxiosResponse = await api.getAllComment({
        pathParams: { slug: payload.slug },
      });

      setIsError(false);
      set({
        listComment: res.data,
      });
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  },
});

export default BookSlice as (
  set: SetState<IBookSlice>,
  get: (state: IBookSlice) => IBookSlice,
  api: StoreApi<IBookSlice>
) => IBookSlice;
