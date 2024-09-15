import { updateOrderStatus } from "@/actions/order.action";
import { CustomerOrder, CustomerOrderVendor } from "@/prisma-types";
import {
  CUSTOMER_ORDER_STATUS,
  CUSTOMER_ORDER_VENDOR_PRODUCT_STATUS,
} from "@/utils/constants";
import { getLocalizedTime } from "@/utils/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

type Props = {
  order: CustomerOrder;
};

export default function OrderDetails({ order }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (customerOrderId: string) => {
      return updateOrderStatus(customerOrderId);
    },
    onSuccess: (res) => {
      if (res.isSuccess) {
        toast.success("Order completed successfully");
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
      } else {
        toast.error(res.message);
      }
    },
  });

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

  const completeOrder = () => {
    mutation.mutate(order.customerOrderId);
  };

  return (
    <div key={order.customerOrderId}>
      <div className='collapse collapse-arrow bg-accent'>
        <input type='checkbox' />
        <div className='collapse-title font-medium'>
          <div className='w-full flex justify-between items-center'>
            <h3 className='text-lg'>{order.orderCode}</h3>
            <div className='flex items-center gap-2'>
              <span className='text-sm'>
                <span className='text-base-content/60 text-xs'>
                  Order Placed At:
                </span>{" "}
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
                <div className='flex items-center justify-between gap-2'>
                  <div className='badge badge-accent'>
                    {vendor.customerOrderVendorStatus}
                  </div>
                </div>
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

          <div className='mt-2 flex justify-between font-semibold gap-4'>
            <p className='text-sm text-balance pt-1'>
              Address: {order.deliveryAddress}, Phone: {order.deliveryContact}
            </p>
            <div className='flex flex-col items-end gap-2'>
              <div className='flex items-center gap-4'>
                <div>Total: ${order.totalPrice}</div>
                <span>/</span>
                <div>
                  Final Amount: $
                  {order.totalPrice -
                    order.customerOrderVendor
                      .map((vendor) => {
                        return vendor.customerOrderVendorProduct.reduce(
                          (acc, prod) => {
                            return prod.orderVendorProductStatus ===
                              CUSTOMER_ORDER_VENDOR_PRODUCT_STATUS.CANCELLED
                              ? acc + prod.price * prod.quantity
                              : acc;
                          },
                          0
                        );
                      })
                      .reduce((acc, price) => acc + price, 0)}
                </div>
              </div>
              {order.orderStatus === CUSTOMER_ORDER_STATUS.DELIVERED && (
                <div className='flex justify-end mt-2'>
                  <button
                    className='btn btn-base'
                    onClick={completeOrder}
                    disabled={mutation.isPending}
                  >
                    Complete Order
                  </button>
                </div>
              )}
              {order.orderStatus === CUSTOMER_ORDER_STATUS.COMPLETED && (
                <div className='flex justify-end mt-2'>
                  <button className='btn btn-base btn-outline' disabled>
                    Order Completed
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
