import CourseCard from "./CourseCard"

interface Props {
  title: string
  courses: Course[]
  containerClassName?: string
}

const BookList = ({ title, courses, containerClassName }: Props) => {
  return (
    <section className={containerClassName}>
      <h2
        className="font-bebas-neue text-4xl text-light-100"
        style={{ color: "#e7dfcf", fontFamily: "var(--bebas-neue)" }}
      >
        {" "}
        {title}{" "}
      </h2>
      <ul className="mt-10 flex flex-wrap gap-5 max-xs:justify-between xs:gap-10">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </ul>
    </section>
  )
}

export default BookList
