import WishlistPage from "@/components/Wishlist/Wishlist";
export const metadata = {
  title: "Lista želja | HOB",
  description: "Dobrodošli na HOB Online Shop",
  keywords: ["House of beauty"],
};
const Wishlist = async () => {
  return <WishlistPage />;
};

export default Wishlist;
