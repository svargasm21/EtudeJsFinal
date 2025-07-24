import { cn } from "@/lib/utils"
import Link from "next/link"
import CourseCover from "./CourseCover"

const CourseCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoaded = false,
}: Course) => {
  return (
    <li className={cn(isLoaded && "xs:w-52 w-full")}>
      <Link
        href={`/courses/${id}`}
        className="w-full flex flex-col items-center"
      >
        <CourseCover coverColor={coverColor} coverImage={coverUrl} />

        <div className={cn("mt-4", isLoaded && "xs:max-w-40 max-w-28")}>
          <p className="mt-2 line-clamp-1 text-base font-semibold text-white xs:text-xl w-40 overflow-hidden whitespace-nowrap text-ellipsis">
            {" "}
            {title}{" "}
          </p>
          <p
            className="mt-1 line-clamp-1 text-sm italic text-light-100 xs:text-base"
            style={{ color: "#e7dfcf" }}
          >
            {" "}
            {genre}{" "}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default CourseCard
