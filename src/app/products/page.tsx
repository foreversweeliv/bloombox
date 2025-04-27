import ProductCard from "@/components/ProductCard";
import { Product, products } from "@/data/products";
import { getProductRating } from "@/lib/db.server";
import Link from "next/link";

async function getProducts(): Promise<Product[]> {
  return products;
}

export default async function Products() {
  const products = await getProducts();
  
  const productsWithRatings = await Promise.all(
    products.map(async (product) => {
      const rating = await getProductRating(product.id);
      return {
        ...product,
        rating: rating || 5
      };
    })
  );

  return (
    <main className="min-h-screen mt-20 py-20 max-w-screen overflow-x-hidden flex flex-col justify-center px-4 sm:px-12 items-center gap-16 sm:gap-30">
      {productsWithRatings.map((product, index) => (
        <Link key={product.id} href={`/products/${product.id}`} className="w-full">
          <div className={`animate-slideInLeft ${index > 0 ? `stagger-${(index % 4) + 1}` : ''}`}>
            <ProductCard
              title={product.title}
              description={product.description}
              image={product.image}
              price={product.price}
              oldPrice={product.oldPrice}
              isReversed={index % 2 !== 0}
              rating={product.rating}
              className="hover-lift"
            />
          </div>
        </Link>
      ))}
    </main>
  );
}
