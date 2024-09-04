export default function ProductCardSkeleton() {
  return (
    <div className='card bg-base-200 shadow-xl'>
      <figure className='w-full h-56 relative skeleton'></figure>
      <div className='card-body'>
        <h2 className='card-title h-4 skeleton'></h2>
        <div className='flex items-center gap-2 flex-wrap'>
          <div className='badge badge-secondary text-xs skeleton'></div>
          <div className='badge badge-secondary text-xs skeleton'></div>
        </div>
        <p className='line-clamp-2 h-4 skeleton'></p>
        <p className='line-clamp-2 h-4 w-1/2 skeleton'></p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary w-20 skeleton'></button>
        </div>
      </div>
    </div>
  );
}
