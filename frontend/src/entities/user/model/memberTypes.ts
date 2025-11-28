export interface Member {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: "owner" | "edit" | "view";
}
