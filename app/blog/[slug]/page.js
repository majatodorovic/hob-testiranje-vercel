import { get as GET } from "@/app/api/api";
import Link from "next/link";
import SinglePost from "@/components/Blog/SinglePost";
import Footer from "@/components/Footer/Footer";
import NewsLetterInstagramSection from "@/components/NewsLetterInstgramSection/NewsLetterInstagramSection";

const getBlogPost = async (slug) => {
  return await GET(`/news/details/${slug}`).then((res) => res?.payload);
};
const BlogPostDetails = async ({ params: { slug } }) => {
  const post = await getBlogPost(slug);
  return (
    <>
      <div className={`mx-auto mt-5 w-[95%] text-left lg:w-full lg:px-[3rem]`}>
        <h1 className={`mt-5 w-full text-[23px] font-bold md:text-[29px]`}>
          {post?.basic_data?.title}
        </h1>
      </div>
      <SinglePost post={post} />
      <div className="block md:mt-[20rem]">
        <NewsLetterInstagramSection />
      </div>
      <Footer />
    </>
  );
};

export default BlogPostDetails;
