import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateSiteSettings() {
  revalidateTag("site-settings", { expire: 0 });
  revalidatePath("/", "layout");
}
