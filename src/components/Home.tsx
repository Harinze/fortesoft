import { useEffect, useState } from "react";
import axios from "axios";

interface ProductMeta {
  qrCode: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
}

interface ProductsResponse {
  products: Product[];
}

const ProductCards = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<ProductsResponse>("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
        setLoading(false);
      });
  }, []);

  const handleToggle = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Welcome to Fortesoft Products Cards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const isExpanded = expandedId === product.id;

          return (
            <div
              key={product.id}
              onClick={() => handleToggle(product.id)}
              className={`bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl ${
                isExpanded ? "border-2 border-blue-500" : ""
              }`}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className={`w-full object-contain rounded-md mb-4 transition-all duration-300 ${
                  isExpanded ? "h-48" : "h-60"
                }`}
              />

              {isExpanded && (
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{product.title}</h2>
                  <p className="text-sm text-gray-700">{product.description}</p>
                  <p className="text-sm text-gray-800 font-semibold">
                    Price: ${product.price}
                  </p>
                  <p className="text-sm text-gray-700">Rating: {product.rating}</p>
                  <p className="text-sm text-gray-700">Stock: {product.stock}</p>
                  <p className="text-sm text-gray-700">Brand: {product.brand}</p>
                  <p className="text-sm text-gray-700">Category: {product.category}</p>
                  <p className="text-sm text-gray-700">Return: {product.returnPolicy}</p>
                  <p className="text-sm text-gray-700">
                    Min Order: {product.minimumOrderQuantity}
                  </p>
                  <a
                    href={product.meta.qrCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View QR Code
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCards;
