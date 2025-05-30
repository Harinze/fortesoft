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

export default function ProductCards() {
  const [products, setProducts] = useState<Product[]>([]);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  useEffect(() => {
    axios.get<ProductsResponse>("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  const toggleCard = (id: number) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-xl rounded-2xl p-4 transition-transform hover:scale-105 cursor-pointer"
          onClick={() => toggleCard(product.id)}
        >
          {expandedCardId === product.id ? (
            <div className="space-y-2">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-contain rounded-md"
              />
              <h2 className="text-xl font-bold">{product.title}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm text-gray-800 font-semibold">Price: ${product.price}</p>
              <p className="text-sm text-gray-800">Rating: {product.rating}</p>
              <p className="text-sm text-gray-600">Stock: {product.stock}</p>
              <p className="text-sm text-gray-600">Brand: {product.brand}</p>
              <p className="text-sm text-gray-600">Category: {product.category}</p>
              <p className="text-sm text-gray-600">Return Policy: {product.returnPolicy}</p>
              <p className="text-sm text-gray-600">Minimum Order: {product.minimumOrderQuantity}</p>
              <a
                href={product.meta.qrCode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                View QR Code
              </a>
            </div>
          ) : (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-60 object-contain rounded-lg"
            />
          )}
        </div>
      ))}
    </div>
  );
}
