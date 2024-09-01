const db = require("./database")
const { ObjectId } = require("mongodb");

const quizzesObj = db.collection("Quizzes");

const quizzesGet = async(req,res) =>{
    const quizzesArr = await quizzesObj.find().toArray();
    console.log(quizzesArr);

    res.render("quizzes_view.ejs", {quizArr : quizzesArr});
}

const addQuiz = (req,res) =>{
    res.render("quizzes_add_view.ejs");
}

const addQuizPOST = async(req,res) =>{
    const {name , description ,created_by , people_attended} = req.body;
    const date = new Date();

    const result = await quizzesObj.insertOne({name : name , description : description , created_by : created_by, people_attended : people_attended, created_at : date});

    if(result.insertedId){
        req.session.msg = "Quiz Added Successfully!";
    }else{
        req.session.msg = "Quiz Add Failed";
    }

    res.redirect("/quiz");
}

const editQuiz = async(req,res) =>{
    const {id} = req.params;

    const quizEdit = await quizzesObj.findOne({_id :new ObjectId(id) });
    res.render("quizzes_edit_view" , {quiz : quizEdit});
}

const editQuizPOST = async(req , res) =>{
    const {id,name , description ,created_by , people_attended } = req.body;
    const date = new Date();

    const result = await quizzesObj.updateOne({_id : new ObjectId(id)} , {$set : {name : name , description : description , created_by : created_by, people_attended : people_attended, updated_at : date}});

    if(result.modifiedCount){
        req.session.msg = "Quiz Edited Successfully!";
    }else{
        req.session.msg = "Quiz Edit Failed";
    }

    res.redirect("/quiz");
}

const deleteQuiz = async(req,res) => {

    const {id} = req.params;

    const result = await quizzesObj.deleteOne({_id : new ObjectId(id)});

    if(result.deletedCount){
        req.session.msg = "Quiz Deleted Successfully!";
    }else{
        req.session.msg = "Quiz Delete Failed";
    }

    res.redirect("/quiz");
}

module.exports = {quizzesGet,addQuiz , addQuizPOST , editQuiz, editQuizPOST, deleteQuiz};