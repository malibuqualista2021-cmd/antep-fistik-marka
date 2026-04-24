import { retailProducts } from "@/lib/shop-products";
import { RetailProductCard } from "@/components/shop/RetailProductCard";

export function RetailProductGrid() {
  const products = retailProducts.filter((product) => product.isActive);

  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <RetailProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
