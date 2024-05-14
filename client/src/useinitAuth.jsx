// Third party modules
import { useDispatch } from "react-redux";

// User Module
import { update } from "./store/features/userSlice.jsx";
import { getItem } from "./Functions/storage.js";

const useinitAuth = () => {
  const dispatch = useDispatch();
  const info = JSON.parse(getItem("info") ?? "{}");
  const token = getItem("token");
  const isAuthenticated = getItem("isAuthenticated");

  dispatch(update({ ...info, token, isAuthenticated }));
};

export default useinitAuth;
