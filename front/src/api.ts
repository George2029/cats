import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:8080/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string) => {
  localStorage.setItem("x-auth-token", token);
};
const deleteAuthToken = () => {
  localStorage.removeItem("x-auth-token");
};

const getAuthToken = (): boolean => {
  const token = localStorage.getItem("x-auth-token");
  if (token) {
    apiClient.defaults.headers["x-auth-token"] = token;
    return true;
  } else {
    return false;
  }
};

export const fetchCats = async (): Promise<Cat[]> => {
  getAuthToken();
  const { data: cats } = await apiClient.get<CatsResponse>("/cats");
  return cats;
};

export const fetchLikes = async (
  navigate: Function,
): Promise<Like[] | null> => {
  let result = getAuthToken();
  if (result) {
    try {
      let { status, data } = await apiClient.get<Like[]>("/likes");
      console.log(`status`, status);
      if (status !== 200) {
        deleteAuthToken();
        navigate("/account");
      }
      return data;
    } catch (err) {
      console.log(`fetchLikes:`, err);
      deleteAuthToken();
      navigate("/account");
      return null;
    }
  } else {
    return null;
  }
};

export const deleteLike = async (
  cat_id: string,
  navigate: Function,
): Promise<boolean> => {
  let result = getAuthToken();
  if (result) {
    try {
      let resp = await apiClient.delete(`/likes/${cat_id}`);
      console.log(`resp`, resp);
      return true;
    } catch (err) {
      console.log(`deleteLike:`, err);
      deleteAuthToken();
      navigate("/account");
      return false;
    }
  } else {
    navigate("/account");
    return false;
  }
};
export const addLike = async (
  cat_id: string,
  url: string,
  navigate: Function,
): Promise<boolean> => {
  let result = getAuthToken();
  if (result) {
    try {
      let { status } = await apiClient.post("/likes", { cat_id, url });
      console.log(`status`, status);
      if (status !== 201) {
        deleteAuthToken();
        navigate("/account");
      }
      return true;
    } catch (err) {
      console.log(`addLike:`, err);
      deleteAuthToken();
      navigate("/account");
      return false;
    }
  } else {
    navigate("/account");
    return false;
  }
};

export const removeLike = async (cat_id: string) => {
  getAuthToken();
  await apiClient.delete(`/likes/${cat_id}`);
};

export const createUser = async (
  login: string,
  password: string,
): Promise<void> => {
  const response = await apiClient.post("/user", { login, password });
  const token = response.headers["x-auth-token"];
  if (token) {
    setAuthToken(token);
  }
};
