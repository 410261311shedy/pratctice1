import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";
const questions = [
   {
      _id: "1",
      title: "How to learn React?",
      description: "I want to learn React, can antone help me?",
      tags: [
         { _id: "1", name: "React" },
         { _id: "2", name: "Javascrips" },
      ],
      author: { _id: "1", name: "Jogn Doe" },
      upvotes: 10,
      ansers: 5,
      view: 100,
      createdAt: new Date(),
   },
   {
      _id: "2",
      title: "How to learn JavaScript?",
      description: "I want to learn React, can antone help me?",
      tags: [
         { _id: "1", name: "React" },
         { _id: "2", name: "Javascrips" },
      ],
      author: { _id: "1", name: "Jogn Doe" },
      upvotes: 10,
      ansers: 5,
      view: 100,
      createdAt: new Date(),
   },
];
interface SearchParams {
   //new in next js , you have to await search params
   //Promise will return an object key of type string which contains a specific string value
   //e.g. query:'react'
   searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParams) => {
   const { query = "" } = await searchParams;
   //now we can use the query t omodify the fetch from our db
   //e.g. const {data} = await axios.get("/api/questions",{query: {search:query} });
   const filterQuestions = questions.filter((question) =>
      question.title.toLocaleLowerCase().includes(query?.toLocaleLowerCase())
   );
   return (
      <>
         {/* section for Title and button */}
         <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="h1-bold text-shadow-dark-100_light900">
               All Questions
            </h1>
            {/* button for asking a question and redirect to ask a question page */}
            <Button
               className="primary-gradient min-h-[46px] px-4 py-3 text-light-900!"
               asChild
            >
               <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
            </Button>
         </section>
         {/* section for searchbar */}
         <section className="mt-11">
            <LocalSearch
               route="/"
               imgSrc="/icons/search.svg"
               placeholder="Search questions..."
               iconPosition="left"
               otherClasses="flex-1"
            />
         </section>
         {/* HomeFilter */}
         {/* div for question cards */}
         <div className="mt-10 flex w-full flex-col gap-6">
            {filterQuestions.map((question) => (
               <h1 key={question._id}>{question.title}</h1>
            ))}
         </div>
      </>
   );
};
export default Home;
