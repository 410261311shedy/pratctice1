import { auth, signOut } from "@/auth";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";

const Home = async () => {
   const session = await auth();
   //for testing if it really get the auth
   console.log(session);
   return (
      <>
         <h1 className="h1-bold"> Welcome to the world of Next.js</h1>

         {/*creating a logout function on server side*/}
         <form
            className="px-10 pt-[100px]"
            action={async () => {
               "use server";
               await signOut({ redirectTo: ROUTES.SIGN_IN });
            }}
         >
            <Button type="submit">Log Out</Button>
         </form>
      </>
   );
};
export default Home;
