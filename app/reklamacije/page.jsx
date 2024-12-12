import Reklamacije from "@/components/Reklamacije/Reklamacije";

export const metadata = () => {
  return {
    title: "Reklamacije | HOB",
    description: "Dobrodošli na houseofbeauty.com Online Shop",
    keywords: [
      "House of beauty"
    ],
  };
};
const ReklamacijePage = () => {
  return <Reklamacije />;
};

export default ReklamacijePage;
