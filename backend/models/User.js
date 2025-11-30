import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // === Обычная регистрация ===
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true, lowercase: true },

    // пароль хранится только для обычной регистрации
    passwordHash: { type: String },

    // === Google OAuth ===
    googleId: { type: String, unique: true, sparse: true },
    avatar: { type: String, default: "" },

    // дополнительные поля
    contact: { type: String, default: "" },
    position: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
