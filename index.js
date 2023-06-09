const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const corsOptions = require("./config/corsOptions");
const sessionOptions = require("./config/sessionOptions");
const rateLimitter = require("./utils/reqLimit");

const userRoute = require("./routes/user.routes");
const tutCatRoute = require("./routes/tutCat.routes");
const docCatRoute = require("./routes/docCat.routes");
const blogCatRoute = require("./routes/blogCat.routes");
const videoCatRoute = require("./routes/videoCat.routes");
const courseCatRoute = require("./routes/courseCat.routes");
const projectCatRoute = require("./routes/projectCat.routes");
const tutorialRoute = require("./routes/tutorial.routes");
const newsLetterRoute = require("./routes/newsLetter.routes");
const googleRouter = require("./routes/google.routes");
const reviewRoute = require("./routes/review.routes");
const contactRoute = require("./routes/contact.routes");
const videoRoute = require("./routes/video.routes");
const blogRoute = require("./routes/blog.routes");
const docRoute = require("./routes/doc.routes");
const courseRoute = require("./routes/course.routes");
const workRoute = require("./routes/work.routes");
const projectRoute = require("./routes/project.routes");
const bookSessionRoute = require("./routes/bookSession.routes");
const qnaRoute = require("./routes/qna.routes");
const notFoundMiddleware = require("./middlewares/not-found.js");
const errorHandlerMiddleware = require("./middlewares/errorHandler.js");
const passportSetup = require("./utils/passport");

//Config
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("dev"));
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./.env",
  });
}

//Routes
app.get("/", (req, res) => {
  res.send(`<a href="http://localhost:5000/google">Login with google</a>`);
});
app.set("trust proxy", 1);
app.use(
  "/api",
  rateLimitter(
    15 * 60 * 1000,
    50,
    "Only 50 request allowed, please try again later."
  )
);
app.use("/api/user", userRoute);
app.use("/api/tutorial/category", tutCatRoute);
app.use("/api/doc/category", docCatRoute);
app.use("/api/blog/category", blogCatRoute);
app.use("/api/video/category", videoCatRoute);
app.use("/api/course/category", courseCatRoute);
app.use("/api/project/category", projectCatRoute);
app.use("/api/tutorial", tutorialRoute);
app.use("/api/newsletter", newsLetterRoute);
app.use("/api/review", reviewRoute);
app.use("/api/contact", contactRoute);
app.use("/api/video", videoRoute);
app.use("/api/blog", blogRoute);
app.use("/api/doc", docRoute);
app.use("/api/course", courseRoute);
app.use("/api/work", workRoute);
app.use("/api/project", projectRoute);
app.use("/api/bookSession", bookSessionRoute);
app.use("/api/qna", qnaRoute);

app.use("/", googleRouter);

//Error handling middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
