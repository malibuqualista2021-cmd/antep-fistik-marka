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
  /** Mobil vitrin: daha büyük dokunma alanı ve tipografi */
  prominent?: boolean;
  /** Sepete ekle düğmesi ek sınıfları */
  buttonClassName?: string;
};

export function AddToCartButton({
  product,
  variantId: controlledId,
  onVariantChange,
  layout = "select",
  prominent = false,
  buttonClassName = "",
}: Props) {
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
            <span
              className={`font-sans font-semibold text-muted ${prominent ? "text-sm md:text-xs" : "text-xs"}`}
            >
              Gramaj seçin
            </span>
            <div
              className={`mt-2 flex flex-wrap ${prominent ? "gap-2.5" : "gap-2"}`}
              role="group"
              aria-label="Gramaj seçimi"
            >
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setVariantId(variant.id)}
                  className={`rounded-full font-sans font-semibold ring-1 transition ${
                    prominent
                      ? "min-h-[48px] px-4 py-2.5 text-sm md:min-h-[42px] md:px-3.5 md:text-xs"
                      : "min-h-[40px] px-3 py-2 text-xs"
                  } ${
                    variantId === variant.id
                      ? "bg-primary text-[var(--color-fg-on-green)] ring-primary"
                      : "bg-background text-foreground ring-[var(--line-medium)] hover:ring-primary/35"
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
              className={`mt-1 w-full rounded-[var(--radius-input)] border border-[var(--input-border)] bg-background px-3 text-foreground ${
                prominent ? "min-h-[52px] text-base md:min-h-[48px] md:text-sm" : "py-2"
              }`}
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
        className={`w-full justify-center ${prominent ? "min-h-[52px] text-base md:min-h-[48px] md:text-sm" : ""} ${buttonClassName}`}
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
