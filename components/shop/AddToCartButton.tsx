"use client";

import { useState } from "react";
import type { RetailProduct } from "@/lib/shop-products";
import { formatMoney } from "@/lib/shop-products";
import { useCart } from "@/components/shop/CartProvider";
import { Button } from "@/components/ui/Button";

type Props = {
  product: RetailProduct;
  /** Dışarıdan gramaj kontrolü (ürün kartı) */
  variantId?: string;
  onVariantChange?: (id: string) => void;
  layout?: "select" | "buttons";
};

export function AddToCartButton({ product, variantId: controlledId, onVariantChange, layout = "select" }: Props) {
  const { addItem } = useCart();
  const [internalId, setInternalId] = useState(product.variants?.[0]?.id ?? "");
  const variantId = controlledId !== undefined ? controlledId : internalId;
  const setVariantId = onVariantChange ?? setInternalId;

  const [added, setAdded] = useState(false);
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
        layout === "buttons" ? (
          <div>
            <span className="font-sans text-xs font-semibold text-muted">Gramaj</span>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Gramaj seçimi">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setVariantId(variant.id)}
                  className={`min-h-[40px] rounded-full px-3 py-2 font-sans text-xs font-semibold ring-1 transition ${
                    variantId === variant.id
                      ? "bg-primary text-[var(--cream)] ring-primary"
                      : "bg-background text-foreground ring-black/10 hover:ring-primary/30"
                  }`}
                >
                  {variant.label}
                  <span className="ml-1 opacity-90">{formatMoney(variant.price, product.currency)}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
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
        )
      ) : null}
      <Button
        type="button"
        variant="cta"
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
