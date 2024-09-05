import { CustomerOrder, CustomerOrderVendor } from "@/prisma-types";
import { getLocalizedTime } from "@/utils/shared";
import Image from "next/image";
import Link from "next/link";

type Props = {
  order: CustomerOrder;
};

export default function OrderDetails({ order }: Props) {
  // Group customerOrderVendor by vendorId without duplicating products
  const groupedVendors = order.customerOrderVendor.reduce((acc, vendor) => {
    if (!acc[vendor.vendorId]) {
      acc[vendor.vendorId] = {
        ...vendor,
        products: vendor.customerOrderVendorProduct,
      };
    } else {
      // Combine products without duplicating
      acc[vendor.vendorId].products = [
        ...acc[vendor.vendorId].products,
        ...vendor.customerOrderVendorProduct.filter(
          (prod) =>
            !acc[vendor.vendorId].products.some(
              (existingProd) =>
                existingProd.customerOrderVendorProductId ===
                prod.customerOrderVendorProductId
            )
        ),
      ];
    }
    return acc;
  }, {} as Record<string, Omit<CustomerOrderVendor, "customerOrderVendorProduct"> & { products: (typeof order.customerOrderVendor)[0]["customerOrderVendorProduct"] }>);

  return (
    <div key={order.customerOrderId}>
      <div className='collapse collapse-arrow bg-accent'>
        <input type='checkbox' />
        <div className='collapse-title font-medium'>
          <div className='w-full flex justify-between items-center'>
            <h3 className='text-lg'>{order.orderCode}</h3>
            <div className='flex items-center gap-2'>
              <span className='text-sm'>
                {getLocalizedTime(order.createdAt)}
              </span>
              <span className='badge'>{order.orderStatus}</span>
            </div>
          </div>
        </div>
        <div className='collapse-content flex flex-col gap-2'>
          {Object.entries(groupedVendors).map(([vendorId, vendor]) => (
            <div key={vendorId} className='bg-base-100 p-4 card'>
              <div className='flex items-center justify-between mb-4'>
                <h4 className='font-medium'>{vendor.vendorName}</h4>
                <span className='badge badge-accent'>
                  {vendor.customerOrderVendorStatus}
                </span>
              </div>
              <div className='flex flex-col gap-2'>
                {vendor.products.map((product) => (
                  <Link
                    href={`/product/${product.product.productId}`}
                    key={product.customerOrderVendorProductId}
                    className='flex justify-between items-center ring-accent hover:ring p-2 rounded-lg'
                  >
                    <div className='flex gap-4'>
                      <figure className='size-16 relative rounded-lg overflow-hidden'>
                        <Image
                          src={product.product.primaryImage}
                          alt={product.productName}
                          className='object-cover rounded-lg'
                          fill
                        />
                      </figure>
                      <div className='flex flex-col'>
                        <h5 className='capitalize'>{product.productName}</h5>
                        <span className='badge badge-outline mt-2'>
                          {product.variantName}
                        </span>
                      </div>
                    </div>
                    <div className='flex gap-4 items-center'>
                      <div className='flex gap-1 items-center badge badge-outline'>
                        <span>{product.quantity}</span>
                        <span>x</span>
                        <span>${product.price}</span>
                      </div>
                      <span className='text-lg font-medium'>
                        ${product.quantity * product.price}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className='mt-2 flex justify-between items-center font-semibold'>
            <p className='text-sm text-balance'>
              Address: {order.deliveryAddress}, Phone: {order.deliveryContact}
            </p>
            <div className='text-xl'>Total: ${order.totalPrice}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
