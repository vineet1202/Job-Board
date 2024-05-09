// Third party modules
import { useDispatch } from "react-redux";

// User Module
import { update } from "./store/features/userSlice.jsx";
import { getItem } from "./Functions/storage.js";

const useinitAuth = () => {
  const dispatch = useDispatch();
  const info = JSON.parse(getItem("info") ?? "{}");
  const token = getItem("token");

  dispatch(update({ ...info, token }));
};

export default useinitAuth;
