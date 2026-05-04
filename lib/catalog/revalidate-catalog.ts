import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateRetailCatalog() {
  revalidateTag("retail-catalog", { expire: 0 });
  revalidatePath("/", "layout");
}
