import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <BackgroundBeamsWithCollision className='h-[80vh] rounded-3xl w-full bg-accent p-4 grid place-items-center'>
      {children}
    </BackgroundBeamsWithCollision>
  );
}
