import { Navbar } from "@/components/navbar";
import { FooterContent } from "@/components/footer-content";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <FooterContent />
    </>
  );
}
