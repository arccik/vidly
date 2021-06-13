const mongoose = require("mongoose");

const url = "mongodb+srv://boss:Artur986@nodedb.48fns.mongodb.net/Playground";

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: {
      name: String,
      type: [authorSchema],

      // ref: "Author",   // reference the author collection
      // type: mongoose.Schema.Types.ObjectId, // reference the property for author
    },
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });
  const result = await author.save();
  console.log(result);
}

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find()
    .populate("author", "name -_id")
    .select("name author");
  console.log(courses);
}

async function updateAuthor(courseId, author) {
  const course = await Course.update(
    { _id: courseId },
    {
      $set: { "author.name": "Arturitoss 22" }, // to update author name property
      // $unset: { author: "" }, // to remove author property
    }
  );
  // const course = await Course.findById(courseId);
  // course.author.name = author;
  // const result = await course.save();
  // console.log(result);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  await course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createAuthor("John", "His BIO", "Some Website");

// createCourse("New Course", "60c5ba134c5bfab773ef163b");

// listCourses();

// createCourse("Mosh lection 115", new Author({ name: "Mosh" }));

// updateAuthor("60c5be7d0c7947b7fea9cf51", "MaX");

// createCourse("API Tutorials", [
//   new Author({ name: "Vova" }),
//   new Author({ name: "Bill" }),
//   new Author({ name: "Julius" }),
// ]);

// addAuthor("60c6033506e11cb919774344", new Author({ name: "Amy" }));

removeAuthor("60c6033506e11cb919774344", "60c6033506e11cb919774343");
