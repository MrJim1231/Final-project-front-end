export interface Member {
  _id: string;
  ownerId: string; // <<< ОБЯЗАТЕЛЬНО
  name: string;
  email: string;
  avatar: string | null;
  role: "owner" | "edit" | "view";
}
