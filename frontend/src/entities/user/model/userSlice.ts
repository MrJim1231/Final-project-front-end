import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAuthToken } from "@/shared/api/api";

// ========================
//     TYPES
// ========================
interface UserState {
  id: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatar: string | null;
  googleId: string | null;

  role: "owner" | "edit" | "view" | null; // <<< ДОБАВЛЕНО

  token: string | null;
  isAuth: boolean;
  isLoaded: boolean;
}

// ================= INIT FROM LOCAL STORAGE =================

const savedUserRaw = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

let savedUser: any = null;
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
  avatar: savedUser?.avatar || null,
  googleId: savedUser?.googleId || null,

  role: savedUser?.role || null, // <<< ЗАГРУЖАЕМ ROLE

  token: savedToken || null,
  isAuth: Boolean(savedToken),
  isLoaded: false,
};

// ================= SLICE =================

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ========================================================
    //                     SET USER (LOGIN)
    // ========================================================
    setUser(
      state,
      action: PayloadAction<{
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        avatar?: string | null;
        googleId?: string | null;
        role?: "owner" | "edit" | "view" | null; // <<< ПОЛУЧАЕМ ROLE
        token: string;
      }>
    ) {
      const userData = {
        id: action.payload.id,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        avatar: action.payload.avatar || null,
        googleId: action.payload.googleId || null,
        role: action.payload.role ?? null, // <<< СОХРАНЯЕМ ROLE
      };

      // Save LS
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", action.payload.token);

      // Save token globally
      setAuthToken(action.payload.token);

      return {
        ...userData,
        token: action.payload.token,
        isAuth: true,
        isLoaded: true,
      };
    },

    // ========================================================
    //                  UPDATE USER
    // ========================================================
    updateUser(
      state,
      action: PayloadAction<{
        firstName?: string;
        lastName?: string;
        email?: string;
        contact?: string;
        position?: string;
        avatar?: string | null;
      }>
    ) {
      const updated = { ...state, ...action.payload };

      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        const merged = { ...parsed, ...action.payload };
        localStorage.setItem("user", JSON.stringify(merged));
      }

      return updated;
    },

    // ========================================================
    //                  SET LOADED
    // ========================================================
    setLoaded(state, action: PayloadAction<boolean>) {
      state.isLoaded = action.payload;
    },

    // ========================================================
    //                  LOGOUT
    // ========================================================
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setAuthToken(null);

      return {
        id: null,
        username: null,
        firstName: null,
        lastName: null,
        email: null,
        avatar: null,
        googleId: null,
        role: null, // <<< ОБНУЛЯЕМ ROLE
        token: null,
        isAuth: false,
        isLoaded: true,
      };
    },
  },
});

// ================= EXPORTS =================

export const { setUser, updateUser, logout, setLoaded } = userSlice.actions;
export default userSlice.reducer;
