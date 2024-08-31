import BuyNowDialog from "@/components/Dialog/BuyNowDialog";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BuyNowDialog />
    </>
  );
}
