import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  isLoaded: true,
};

// ====== SLICE ======
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // === УСТАНОВИТЬ ПОЛЬЗОВАТЕЛЯ (ЛОГИН) ===
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

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", action.payload.token);

      return {
        ...userData,
        token: action.payload.token,
        isAuth: true,
        isLoaded: true,
      };
    },

    // === ОБНОВИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ===
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

      // Обновляем в localStorage
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        const newUserData = { ...parsedUser, ...action.payload };
        localStorage.setItem("user", JSON.stringify(newUserData));
      }

      return updatedData;
    },

    // === УСТАНОВИТЬ ФЛАГ ЗАГРУЗКИ ===
    setLoaded(state, action: PayloadAction<boolean>) {
      state.isLoaded = action.payload;
    },

    // === ВЫХОД ===
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

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
