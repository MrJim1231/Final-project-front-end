import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;
  isAuth: boolean;
}

// Загружаем данные из localStorage
const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

const initialState: UserState = savedUser
  ? {
      ...JSON.parse(savedUser),
      token: savedToken,
      isAuth: true,
    }
  : {
      id: null,
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      token: null,
      isAuth: false,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Устанавливаем пользователя после логина
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
        token: action.payload.token,
        isAuth: true,
      };

      // Сохраняем в localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userData.id,
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        })
      );
      localStorage.setItem("token", userData.token!);

      return userData;
    },

    // Выход из системы
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
      };
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
