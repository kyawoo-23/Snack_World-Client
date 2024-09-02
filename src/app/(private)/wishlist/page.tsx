import { getWishList } from "@/actions/wishlist.action";
import WishList from "@/components/pages/Wishlist/WishList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishList(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WishList />
    </HydrationBoundary>
  );
}
