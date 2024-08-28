import Navbar from "@/components/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className='max-w-7xl mx-auto'>{children}</main>
    </>
  );
}
