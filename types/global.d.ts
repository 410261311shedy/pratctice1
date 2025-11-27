//Declares global types in TS
//To keep ypur code organized and reusable
//no need to be imported
interface Tag {
   _id: string;
   name: string;
}

interface Author {
   _id: string;
   name: string;
   image: string;
}

interface Question {
   _id: string;
   title: string;
   //tags in the question is just an array of diff tag interfaces
   tags: Tag[];
   author: Author;
   createdAt: Date;
   upvotes: number;
   answers: number;
   views: number;
}
