import type { KitProduct } from "@/lib/kits-catalog";
import { KitCardEnhanced } from "@/components/kits/kit-card-enhanced";

export function KitCard({
  kit,
  expanded = false,
}: {
  kit: KitProduct;
  expanded?: boolean;
}) {
  return <KitCardEnhanced kit={kit} variant={expanded ? "catalog" : "spotlight"} />;
}
