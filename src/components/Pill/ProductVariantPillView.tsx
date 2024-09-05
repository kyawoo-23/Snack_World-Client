export default function ProductVariantPillView({
  color,
  name,
}: {
  color: string;
  name: string;
}) {
  return (
    <div className='flex !flex-row products-center justify-between gap-2 p-2 card bg-accent items-center'>
      <div
        className='size-4 rounded-full'
        style={{
          backgroundColor: color,
        }}
      ></div>
      <div className='text-md font-medium'>{name}</div>
    </div>
  );
}
