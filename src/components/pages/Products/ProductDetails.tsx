"use client";

import { getProductDetails } from "@/actions/product.action";
import Carousel from "@/components/Carousel";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetails({ id }: { id: string }) {
  const { data, isFetching } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id),
  });

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      {!isFetching && data?.data && (
        <>
          <div>
            <Carousel
              name={data.data.name}
              images={[
                data.data.primaryImage,
                ...data.data.productImage.map((image) => image.image),
              ].map((image) => image.toString())}
            />
          </div>
          <div>hi</div>
        </>
      )}
    </div>
  );
}
