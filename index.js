const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { usersGet, editUsers, editUsersPOST, deleteUser, addUser, addUserPOST} = require("./users");
let expressSession = require('express-session');
const { quizzesGet, addQuiz, addQuizPOST, editQuiz, deleteQuiz, editQuizPOST } = require("./quizzes");
const { questionsGet, addquestion, addQuestionPOST, editQuestion, editQuestionPOST, deleteQuestion } = require("./questions");
const { statsGet, addStat, addStatPOST, editStat, editStatPOST, deleteStat }  = require("./stats.js")
const { getAchievements, addAchievement, addAchievementPOST, editAchievement, editAchievementPOST, deleteAchievement } = require("./achievements.js");


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
app.get("/questionadd", addquestion);
app.post("/questionaddpost", addQuestionPOST);
app.get("/questionedit/:id" , editQuestion);
app.post("/questioneditpost" , editQuestionPOST);
app.get("/questiondelete/:id" , deleteQuestion);

app.get("/stat", statsGet);
app.get("/statadd", addStat);
app.post("/stataddpost", addStatPOST);
app.get("/statedit/:id", editStat);
app.post("/stateditpost", editStatPOST);
app.get("/statdelete/:id", deleteStat);

app.get("/achievement", getAchievements);
app.get("/achievementadd", addAchievement);
app.post("/achievementaddpost", addAchievementPOST);
app.get("/achievementedit/:id", editAchievement);
app.post("/achievementeditpost", editAchievementPOST);
app.get("/achievementdelete/:id", deleteAchievement);


const PORT = 3000;
app.listen(PORT , () => {
    console.log("Server listen at http://localhost:" + PORT);
})