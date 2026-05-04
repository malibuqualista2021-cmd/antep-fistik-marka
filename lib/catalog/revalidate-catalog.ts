import { revalidateTag } from "next/cache";

export function revalidateRetailCatalog() {
  revalidateTag("retail-catalog", { expire: 0 });
}
