import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCart = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["cart", email],
    enabled: !!email,
    queryFn: async () => {
      const { data } = await axiosSecure.get("/cart", {
        params: { email },
      });
      return data;
    },
  });
};

export default useCart;