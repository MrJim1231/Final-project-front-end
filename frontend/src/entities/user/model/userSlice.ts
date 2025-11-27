import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAuthToken } from "@/shared/api/api";

interface UserState {
  id: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatar: string | null;
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
    console.log("📌 [Redux INIT] Loaded user from LS:", savedUser);
  } catch (err) {
    console.log("❌ [Redux INIT] Failed to parse LS user", err);
  }
}

const initialState: UserState = {
  id: savedUser?.id || null,
  username: savedUser?.username || null,
  firstName: savedUser?.firstName || null,
  lastName: savedUser?.lastName || null,
  email: savedUser?.email || null,
  avatar: savedUser?.avatar || null,

  token: savedToken || null,
  isAuth: Boolean(savedToken),
  isLoaded: false,
};

// ================= SLICE =================

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ================= LOGIN =================
    setUser(
      state,
      action: PayloadAction<{
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        avatar?: string | null;
        token: string;
      }>
    ) {
      console.log("🔵 [setUser] Payload:", action.payload);
      console.log("🔵 [setUser] Avatar from backend:", action.payload.avatar);

      const userData = {
        id: action.payload.id,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        avatar: action.payload.avatar || null,
      };

      console.log("🟢 [setUser] Saving user to LS:", userData);

      // Save LS
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", action.payload.token);

      // Save token globally
      setAuthToken(action.payload.token);

      console.log("🟢 [setUser] FINAL Redux state:", {
        ...userData,
        token: action.payload.token,
      });

      return {
        ...userData,
        token: action.payload.token,
        isAuth: true,
        isLoaded: true,
      };
    },

    // ================= UPDATE USER =================
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
      console.log("🟡 [updateUser] Payload:", action.payload);
      console.log("🟡 [updateUser] Avatar update:", action.payload.avatar);

      const updated = { ...state, ...action.payload };

      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        const merged = { ...parsed, ...action.payload };

        console.log("🟡 [updateUser] Saving updated LS user:", merged);
        localStorage.setItem("user", JSON.stringify(merged));
      }

      console.log("🟡 [updateUser] FINAL Redux state:", updated);
      return updated;
    },

    // ================= SET LOADED =================
    setLoaded(state, action: PayloadAction<boolean>) {
      console.log("🟢 [setLoaded]", action.payload);
      state.isLoaded = action.payload;
    },

    // ================= LOGOUT =================
    logout() {
      console.log("🔴 [logout] Clearing user");

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
