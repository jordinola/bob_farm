import { toast } from "react-toastify";

export const fetchTranstactions = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/corn`);

  if (!response.ok) {
    toast.error("Failed to fetch transactions");
    return [];
  }

  return response.json();
};

export const addTransaction = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/corn`, {
    method: "POST",
  });

  if (!response.ok) {
    toast.error("Failed to buy corn. Wait a moment and try again.");
    return;
  }

  toast.success("Successfully bought corn!");
};
