const db = require("./database")
const { ObjectId } = require("mongodb");

const questionsObj = db.collection("Questions");

const questionsGet = async(req,res) =>{
    const questionsArr = await questionsObj.find().toArray();

    res.render("questions_view.ejs", {questions : questionsArr});
}

const addquestion = (req,res) =>{
    res.render("questions_add_view.ejs");
}

const addQuestionPOST = async(req,res) =>{
    const {question_text , type , options, correct_answer, explanation , tags } = req.body;

    const result = await questionsObj.insertOne({question_text : question_text, type : type , options : options.split(','), correct_answer : correct_answer, explanation : explanation , tags : tags.split(',')});

    if(result.insertedId){
        req.session.msg = "Question Added Successfully!";
    }else{
        req.session.msg = "Question Add Failed";
    }

    res.redirect("/question");
}

const editQuestion = async(req,res) =>{
    const {id} = req.params;

    const questionEdit = await questionsObj.findOne({_id :new ObjectId(id) });
    res.render("questions_edit_view" , {question : questionEdit});
}

const editQuestionPOST = async(req , res) =>{
    const {id, question_text , type , options, correct_answer, explanation , tags } = req.body;

    console.log(req.body);

    const result = await questionsObj.updateOne({_id : new ObjectId(id)} , {$set : {question_text : question_text, type : type , options : options.split(','), correct_answer : correct_answer, explanation : explanation , tags : tags.split(',')}});

    if(result.modifiedCount){
        req.session.msg = "Question Edited Successfully!";
    }else{
        req.session.msg = "Question Edit Failed";
    }

    res.redirect("/question");
}

const deleteQuestion = async(req,res) => {

    const {id} = req.params;

    const result = await questionsObj.deleteOne({_id : new ObjectId(id)});

    if(result.deletedCount){
        req.session.msg = "Question Deleted Successfully!";
    }else{
        req.session.msg = "Question Delete Failed";
    }

    res.redirect("/question");
}

module.exports = {questionsGet,addquestion , addQuestionPOST , editQuestion, editQuestionPOST, deleteQuestion};