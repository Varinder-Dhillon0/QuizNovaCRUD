const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { usersGet, editUsers, editUsersPOST, deleteUser, addUser, addUserPOST} = require("./users");
let expressSession = require('express-session');
const { quizzesGet, addQuiz, addQuizPOST, editQuiz, deleteQuiz, editQuizPOST } = require("./quizzes");
const { questionsGet } = require("./questions");

app.use(expressSession({secret: "node_mongo123!@#", resave:true, saveUninitialized: true}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());
app.set("view engine" , "ejs")
app.use("/public" , express.static("public"));

app.use((req, res, next) => {
    res.locals.msg = req.session.msg;
    req.session.msg = null;
    next();
});

app.get("/" , usersGet);
app.get("/useradd", addUser);
app.post("/useraddpost", addUserPOST);
app.get("/useredit/:id" , editUsers);
app.post("/usereditpost" , editUsersPOST);
app.get("/deleteuser/:id" , deleteUser);

app.get("/quiz" , quizzesGet);
app.get("/quizadd", addQuiz);
app.post("/quizaddpost", addQuizPOST);
app.get("/quizedit/:id" , editQuiz);
app.post("/quizeditpost" , editQuizPOST);
app.get("/quizdelete/:id" , deleteQuiz);

app.get("/question" , questionsGet);


const PORT = 3000;
app.listen(PORT , () => {
    console.log("Server listen at http://localhost:" + PORT);
})