import Link from "next/link";

const Home = () => (
   <main>
      <Link href="/app/projects/list">See Project</Link>
      <h1 className="h1-bold">Hello World!</h1>
      <h1 className="h1-bold font-space-grotesk">Hello World!(inter)</h1>
   </main>
);

export default Home;
