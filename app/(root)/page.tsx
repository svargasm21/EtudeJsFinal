import Image from "next/image";
import { Button } from "../../components/ui/button";
import BookOverview  from "../../components/ui/CourseOverview";
import BookList  from "../../components/ui/CourseList";
import { sampleBooks } from "../constants";

const Home = () => (
  <> 
    <BookOverview {...sampleBooks[0]} />
\
    <BookList 

        title="Popular Courses"
        courses = {sampleBooks}
        containerClassName="mt-28"

    />
  </>
);

export default Home;