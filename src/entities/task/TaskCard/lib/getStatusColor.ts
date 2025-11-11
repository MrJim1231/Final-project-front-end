export const getStatusColor = (status: string) => {
  switch (status) {
    case "Not Started":
      return "#ff4444";
    case "In Progress":
      return "#007bff";
    case "Completed":
      return "#00c851";
    default:
      return "#ccc";
  }
};
