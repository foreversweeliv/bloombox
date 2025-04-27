"use client"

import Button from "@/components/Button";
import { Product } from "@/data/products";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import OrderForm from "./OrderForm";

interface BuyButtonProps {
  children: React.ReactNode;
  product: Product;
  className?: string;
}

export default function BuyButton({ children, product, className }: BuyButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button iconLeft={ShoppingCart} size="large" onClick={openModal} className={className}>
        {children}
      </Button>

      {isModalOpen && createPortal(
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal}
          title="Placing an order"
        >
          <OrderForm product={product} onClose={closeModal} />
        </Modal>,
        document.body
      )}
    </>
  );
} 