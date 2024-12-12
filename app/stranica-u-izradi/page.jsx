import Link from "next/link";
import Footer from "@/components/Footer/Footer"

const PageInConstruction = () => {
  return (
    <>
      <div> 
            <div className="flex flex-col mt-[0rem] lg:mt-[7rem] items-center constructionHolder">
          <p className="text-[40px]">
            Stranica je trenutno u izradi.
          </p>
          <Link
            href="/"
            className="bg-black rounded-[30px] mt-10 px-10 font-medium text-white hover:bg-opacity-80 py-4 shadow-lg hover:translate-y-0.5 transition-all duration-300"
          >
            Idite na početnu
          </Link>
     
      </div>
      <Footer />
        </div>
    )
    </>
  );
};

export default PageInConstruction;

export const metadata = {
    title: "Stranica u izradi | HOB",
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
};
