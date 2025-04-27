import BackButton from "@/components/BackButton";
import BuyButton from "@/components/BuyButton";
import CareInstructions from "@/components/CareInstructions";
import Rating from "@/components/Rating";
import ReviewSection from "@/components/ReviewSection";
import { Product, products } from "@/data/products";
import { getProductRating } from "@/lib/db.server";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

async function getProduct(id: string): Promise<Product> {
  const product = products.find(product => product.id === id);
  
  if (!product) {
    notFound();
  }

  return product;
}

export async function generateMetadata({ params }: ProductDetailProps) {
  const resolvedParams = await params;
  
  try {
    const product = await getProduct(resolvedParams.id);
    
    return {
      title: `${product.title} | BloomBox`,
      description: product.description,
    };
  } catch {
    return {
      title: 'Product not found | BloomBox',
      description: 'Requested product not found',
    };
  }
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);
  const rating = await getProductRating(product.id);

  return (
    <main className="min-h-screen pt-20 sm:pt-32 pb-20 max-w-screen overflow-x-hidden flex flex-col px-4 sm:px-12 items-center">
      <div className="w-full max-w-6xl">
        <div className="animate-slideInLeft">
          <BackButton href="/products">
            Back to products
          </BackButton>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 mb-12 sm:mb-16 mt-18">
          <div className="relative min-h-[350px] sm:min-h-[500px] w-full sm:w-[40%] rounded-3xl p-4 sm:p-8 bg-accent-dark select-none animate-scale">
            <div className="absolute inset-0 scale-[1.2] -translate-y-[10%]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain transition-transform duration-300 scale-x-[-1] hover-lift"
                priority
              />
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-4 sm:gap-6 animate-slideInLeft stagger-1">
            <h1 className="font-bold text-4xl sm:text-5xl">{product.title}</h1>
            <p className="text-foreground-secondary text-lg sm:text-xl">
              {product.description}
            </p>
            <div className="flex items-center gap-2">
              <Rating value={rating || 5} />
              {rating && (
                <span className="text-foreground-secondary">
                  ({rating})
                </span>
              )}
            </div>
            
            <div className="flex items-end gap-4 mt-auto">
              <span className="text-3xl sm:text-4xl font-bold">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-xl sm:text-2xl text-foreground-secondary line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="mt-4">
              <div className="hover-scale inline-block w-full sm:w-auto">
                <BuyButton product={product}>Buy now</BuyButton>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 mb-12 sm:mb-16">
          <div className="animate-slideInLeft stagger-2">
            <h2 className="font-bold text-2xl sm:text-3xl mb-4">Description</h2>
            <p className="text-foreground-secondary text-base sm:text-lg">{product.details}</p>
          </div>
          
          <div className="animate-slideInLeft stagger-3">
            <h2 className="font-bold text-2xl sm:text-3xl mb-4">Features</h2>
            <div className="flex flex-col gap-4 text-base sm:text-lg">
              <p><span className="font-medium">Dimensions:</span> {product.specs.dimensions}</p>
              <p><span className="font-medium">Weight:</span> {product.specs.weight}</p>
              
              <div>
                <p className="font-medium mb-2">Materials:</p>
                <ul className="pl-5">
                  {product.specs.materials.map((material, index) => (
                    <li key={index} className="text-foreground-secondary mb-1 hover-lift">{material}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-slideInLeft stagger-4">
          <CareInstructions instructions={product.specs.careInstructions} />
        </div>
        
        <div className="mt-12 sm:mt-16 animate-slideInLeft stagger-4">
          <ReviewSection productId={product.id} />
        </div>
      </div>
    </main>
  );
} 