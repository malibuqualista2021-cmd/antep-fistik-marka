"use client";

import { useState } from "react";
import type { RetailProduct } from "@/lib/shop-products";
import { formatMoney } from "@/lib/shop-products";
import { useCart } from "@/components/shop/CartProvider";
import { Button } from "@/components/ui/Button";

export function AddToCartButton({ product }: { product: RetailProduct }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id ?? "");
  const disabled = product.stockStatus === "out_of_stock";
  const selectedVariant = product.variants?.find((variant) => variant.id === variantId);
  const selectedProduct = selectedVariant
    ? {
        ...product,
        id: `${product.id}-${selectedVariant.id}`,
        price: selectedVariant.price,
        weight: selectedVariant.weight,
      }
    : product;

  return (
    <div className="space-y-3">
      {product.variants?.length ? (
        <label className="block font-sans text-sm text-muted">
          Gramaj seçimi
          <select
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="mt-1 w-full rounded-[var(--radius-input)] border border-black/15 bg-background px-3 py-2 text-foreground"
          >
            {product.variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.label} - {formatMoney(variant.price, product.currency)}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <Button
        type="button"
        variant="primary"
        className="w-full justify-center"
        onClick={() => {
          if (disabled) return;
          addItem(selectedProduct);
          setAdded(true);
          window.setTimeout(() => setAdded(false), 1400);
        }}
        aria-label={`${product.name} sepete ekle`}
      >
        {disabled ? "Stokta yok" : added ? "Sepete eklendi" : "Sepete ekle"}
      </Button>
    </div>
  );
}
