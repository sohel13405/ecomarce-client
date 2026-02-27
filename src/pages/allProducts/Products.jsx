import { Link, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search") || "";

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", searchText],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`,
        {
          params: { search: searchText },
        }
      );
      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-20">
      {products.map((product) => (
        <Link to={`/addtocart/${product._id}`}>
        <div key={product._id} className=" flex flex-col items-center justify-center p-4 rounded-lg">
            <img className="w-32 " src={product.image} alt="" />
          <h2 className="font-bold">{product.name}</h2>
          <p>${product.price}</p>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;