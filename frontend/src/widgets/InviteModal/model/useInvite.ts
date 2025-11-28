import { useEffect, useState } from "react";
import { inviteApi } from "../api/inviteApi";

export const useInvite = () => {
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [projectLink, setProjectLink] = useState("");

  useEffect(() => {
    loadMembers();
    loadProjectLink();
  }, []);

  const loadMembers = async () => {
    const res = await inviteApi.getMembers();
    setMembers(res.data);
  };

  const loadProjectLink = async () => {
    const res = await inviteApi.getProjectLink();
    setProjectLink(res.data.link);
  };

  const sendInvite = async () => {
    if (!email.trim()) return;
    await inviteApi.sendInvite(email);
    setEmail("");
    loadMembers();
  };

  const changeRole = async (id: string, role: string) => {
    await inviteApi.updateRole(id, role);
    loadMembers();
  };

  return {
    email,
    setEmail,
    members,
    projectLink,
    sendInvite,
    changeRole,
  };
};
