import SearchPage from "@/components/SearchPage/SearchPage";
import { Suspense } from "react";

const Search = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default Search;

export const generateMetadata = ({ searchParams: { search } }) => {
  return {
    title: `Pretraga: ${search} | HOB`,
    description: "Dobrodošli na hobbrandgroup.com Online Shop",
    keywords: [
      "HOB",
      "online",
      "shop",
      "hobbrandgroup.com",
      "kozmetički preparati",
      "frizerski pribor",
      "gel lakovi",
      "pincete",
      "pet program",
      "barber",
    ],
    robots: {
      index: false,
      follow: false,
    },
  };
};
