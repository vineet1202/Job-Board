import { useDispatch } from "react-redux";
import { reset, update } from "../../store/features/userSlice";
import { setItem } from "../../Functions/storage";
import axios from "axios";

const dispatch = useDispatch();

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/refresh-token`,
      null,
      { withCredentials: true }
    );

    const { accessToken, expiresAt } = response.data;

    if (response.status === 200) {
      setItem("token", accessToken);
      setItem("expiresAt", expiresAt);
      dispatch(update({ token: accessToken, expiresAt: expiresAt }));
    }
  } catch (e) {
    console.log(e);
    if (e.response.status === 401) {
      dispatch(reset());
    }
  }
};
