import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAuthToken } from "@/shared/api/api"; // ⬅️ СЮДА ПОДКЛЮЧАЕМ axios token setter

interface UserState {
  id: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;

  isAuth: boolean;
  isLoaded: boolean;
}

// ====== INIT FROM LOCALSTORAGE ======
const savedUserRaw = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

let savedUser = null;
if (savedUserRaw) {
  try {
    savedUser = JSON.parse(savedUserRaw);
  } catch {}
}

const initialState: UserState = {
  id: savedUser?.id || null,
  username: savedUser?.username || null,
  firstName: savedUser?.firstName || null,
  lastName: savedUser?.lastName || null,
  email: savedUser?.email || null,

  token: savedToken || null,
  isAuth: Boolean(savedToken),
  isLoaded: false, // важно! App сам выставит true
};

// ====== SLICE ======
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // === LOGIN ===
    setUser(
      state,
      action: PayloadAction<{
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        token: string;
      }>
    ) {
      const userData = {
        id: action.payload.id,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
      };

      // Save in LS
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", action.payload.token);

      // Set token in axios globally
      setAuthToken(action.payload.token);

      return {
        ...userData,
        token: action.payload.token,
        isAuth: true,
        isLoaded: true,
      };
    },

    // === UPDATE PROFILE ===
    updateUser(
      state,
      action: PayloadAction<{
        firstName?: string;
        lastName?: string;
        email?: string;
        contact?: string;
        position?: string;
      }>
    ) {
      const updatedData = { ...state, ...action.payload };

      // Update LS
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        const newUserData = { ...parsed, ...action.payload };
        localStorage.setItem("user", JSON.stringify(newUserData));
      }

      return updatedData;
    },

    // === SET LOADED ===
    setLoaded(state, action: PayloadAction<boolean>) {
      state.isLoaded = action.payload;
    },

    // === LOGOUT ===
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // убираем токен из axios
      setAuthToken(null);

      return {
        id: null,
        username: null,
        firstName: null,
        lastName: null,
        email: null,
        token: null,
        isAuth: false,
        isLoaded: true,
      };
    },
  },
});

// ====== EXPORTS ======
export const { setUser, updateUser, logout, setLoaded } = userSlice.actions;
export default userSlice.reducer;
