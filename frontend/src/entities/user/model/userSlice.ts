import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;

  isAuth: boolean; // пользователь авторизован
  isLoaded: boolean; // данные загружены из localStorage
}

// ==== Загружаем из localStorage ====
const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

const initialState: UserState = {
  id: savedUser ? JSON.parse(savedUser).id : null,
  username: savedUser ? JSON.parse(savedUser).username : null,
  firstName: savedUser ? JSON.parse(savedUser).firstName : null,
  lastName: savedUser ? JSON.parse(savedUser).lastName : null,
  email: savedUser ? JSON.parse(savedUser).email : null,
  token: savedToken ? savedToken : null,

  isAuth: Boolean(savedToken),
  isLoaded: false, // ⬅ сначала false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // === ЛОГИН / ПОЛУЧЕНИЕ ПРОФИЛЯ ===
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

      // Сохраняем в localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        ...userData,
        token: action.payload.token,
        isAuth: true,
        isLoaded: true,
      };
    },

    // === ЗАВЕРШЕНИЕ ЗАГРУЗКИ (чтобы убрать мигание) ===
    setLoaded(state, action: PayloadAction<boolean>) {
      state.isLoaded = action.payload;
    },

    // === ВЫХОД ===
    logout(state) {
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
        isLoaded: true, // уже загружено
      };
    },
  },
});

export const { setUser, logout, setLoaded } = userSlice.actions;
export default userSlice.reducer;
