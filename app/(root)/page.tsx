import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import Link from "next/link";

const questions = [
   {
      _id: "1",
      title: "How to learn React?",
      description: "I want to learn React, can antone help me?",
      tags: [
         { _id: "1", name: "React" },
         { _id: "2", name: "Javascript" },
      ],
      author: {
         _id: "1",
         name: "Jogn Doe",
         image: "https://img.freepik.com/premium-vector/young-man-avatar-character-due-avatar-man-vector-icon-cartoon-illustration_1186924-4438.jpg?semt=ais_hybrid&w=740&q=80",
      },
      upvotes: 10,
      answers: 5,
      views: 100,
      createdAt: new Date(),
   },
   {
      _id: "2",
      title: "How to learn JavaScript?",
      description: "I want to learn React, can antone help me?",
      tags: [
         { _id: "1", name: "Javascript" },
         { _id: "2", name: "Javascript" },
      ],
      author: {
         _id: "1",
         name: "Jogn Doe",
         image: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
      },
      upvotes: 10,
      answers: 5,
      views: 100,
      createdAt: new Date("2022-09-01"),
   },
];
// const test = async () => {
//    try {
//       throw new ValidationError({
//          title: ["Required"],
//          tags: ['"Js" is not a valid tag.'],
//       });
//    } catch (error) {
//       return handleError(error);
//    }
// }; //for testing the handle-errors functions

interface SearchParams {
   //new in next js , you have to await search params
   //Promise will return an object key of type string which contains a specific string value
   //e.g. query:'react'
   searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParams) => {
   // await test();

   const { query = "", filter = "" } = await searchParams;
   //now we can use the query t omodify the fetch from our db
   //e.g. const {data} = await axios.get("/api/questions",{query: {search:query} });
   const filterQuestions = questions.filter((question) => {
      const matchedQuery = question.title
         .toLowerCase()
         .includes(query.toLowerCase());
      const matchesFilter = filter
         ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
         : true;
      return matchedQuery && matchesFilter;
   });
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
         <HomeFilter />
         {/* div for question cards */}
         <div className="mt-10 flex w-full flex-col gap-6">
            {filterQuestions.map((question) => (
               <QuestionCard key={question._id} question={question} />
            ))}
         </div>
      </>
   );
};
export default Home;
