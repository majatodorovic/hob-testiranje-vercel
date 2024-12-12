import CheckoutPage from "@/components/CheckoutPage/CheckoutPage";
import { get, list } from "../api/api";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";

const paymentOptions = async () => {
  return await get("/checkout/payment-options").then(
    (response) => response?.payload
  );
};
const deliveryOptions = async () => {
  return await get("/checkout/delivery-options").then(
    (response) => response?.payload
  );
};

const getRecommendedProducts = async () => {
  return await list("/products/section/list/recommendation").then(
    (res) => res?.payload?.items
  );
};

const getCountries = async () => {
  return await get(`/checkout/ddl/id_country`).then((res) => res?.payload);
};

export const metadata = {
  title: "Korpa | HOB",
  description: "Dobrodošli na houseofbeauty.com Online Shop",
  keywords: ["House of beauty"],
};

const Cart = async () => {
  const [paymentoptions, deliveryoptions, recommendedProducts, countries] =
    await Promise.all([
      paymentOptions(),
      deliveryOptions(),
      getRecommendedProducts(),
      getCountries(),
    ]);

  return (
    <>
      <CheckoutPage
        paymentoptions={paymentoptions}
        deliveryoptions={deliveryoptions}
        recommendedProducts={recommendedProducts}
        countries={countries}
      />
      <Footer />
    </>
  );
};

export default Cart;

export const revalidate = 30;
