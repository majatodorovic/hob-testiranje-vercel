import { list as LIST } from "@/app/api/api";
import Image from "next/image";
import AllPosts from "@/components/Blog/AllPosts";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import NewsLetterInstagramSection from "@/components/NewsLetterInstgramSection/NewsLetterInstagramSection";
import leaf from "@/assets/shapes/leaf-cut.png";
const getAllBlogPosts = async () => {
  return await LIST(`/news/category/list/all`).then(
    (res) => res?.payload?.items,
  );
};

const Blog = async () => {
  const posts = await getAllBlogPosts();

  return (
    <>
      <Image
        src={leaf}
        width={540}
        height={380}
        alt="HOB"
        className="absolute left-0 top-[5.4rem] z-[0]"
      />
      <div className={`mx-auto mt-[3rem] w-[95%] lg:w-full lg:px-[3rem]`}>
        <h1 className="text-[60px]">Blog</h1>
      </div>

      <AllPosts posts={posts} />
      <div className="block md:mt-[20rem]">
        <NewsLetterInstagramSection />
      </div>
      <Footer />
    </>
  );
};

export default Blog;

export const revalidate = 30;

export const metadata = {
  title: "Blog | HOB",
  description: "Blog objave",
};
