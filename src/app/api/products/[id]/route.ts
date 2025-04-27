import { products } from "@/data/products";
import { NextRequest } from "next/server";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  if (typeof id !== 'string') {
    return Response.json(
      { error: "Invalid product ID" },
      { status: 400 }
    );
  }

  const product = products.find(product => product.id === id);
  
  if (!product) {
    return Response.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return Response.json(product);
} 