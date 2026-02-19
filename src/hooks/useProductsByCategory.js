
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProductsByCategory = () => {
  return useQuery({
    queryKey: ["products-by-category"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products-by-category`
      );
      
      return data;
    },
  });
};

export default useProductsByCategory;
