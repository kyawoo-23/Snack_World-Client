"use client";

import { getCustomerOrders } from "@/actions/order.action";
import OrderDetails from "@/components/pages/Orders/OrderDetails";
import { getLocalizedDate } from "@/utils/shared";
import { useQuery } from "@tanstack/react-query";

export default function OrderList() {
  const { data, isFetching } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getCustomerOrders(),
  });

  // Group orders by the formatted `createdAt` date
  const groupedOrders = data?.data.reduce((acc, order) => {
    const formattedDate = getLocalizedDate(order.createdAt);
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(order);
    return acc;
  }, {} as Record<string, typeof data.data>);

  console.log(groupedOrders);

  return (
    <>
      {isFetching ? (
        <div className='flex flex-col gap-3'>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div key={index} className='skeleton h-24'></div>
            ))}
        </div>
      ) : (
        <>
          {groupedOrders &&
            Object.keys(groupedOrders).map((date) => (
              <div key={date} className='border-b-2 pb-6 border-accent mb-8'>
                <h2 className='mb-4'>{date}</h2>
                <div className='flex flex-col gap-3'>
                  {groupedOrders[date].map((order) => (
                    <OrderDetails key={order.customerOrderId} order={order} />
                  ))}
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
}
