import { AiAssistantDock } from "@/components/ai-assistant-dock";
import { SiteFooter } from "@/components/site-footer";
import { PublicNav } from "@/components/product/public-nav";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicNav />
      {children}
      <SiteFooter />
      <AiAssistantDock />
    </>
  );
}
