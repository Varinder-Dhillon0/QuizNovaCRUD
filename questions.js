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
    const {firstname , lastname ,email , password, role } = req.body;
    const date = new Date();

    const result = await questionsObj.insertOne({first_name : firstname , last_name : lastname , email : email, password : password, registered_at : date , roles : role});

    if(result.insertedId){
        req.session.msg = "User Added Successfully!";
    }else{
        req.session.msg = "User Add Failed";
    }

    res.redirect("/");
}

const editQuestion = async(req,res) =>{
    const {id} = req.params;

    const questionEdit = await questionsObj.findOne({_id :new ObjectId(id) });
    res.render("questions_edit_view" , {question : questionEdit});
}

const editQuestionPOST = async(req , res) =>{
    const {id,firstname , lastname ,email , password, role } = req.body;

    console.log(req.body);

    const result = await questionsObj.updateOne({_id : new ObjectId(id)} , {$set : {first_name : firstname , last_name : lastname , email : email, password : password , roles : role}});

    if(result.modifiedCount){
        req.session.msg = "User Edited Successfully!";
    }else{
        req.session.msg = "User Edit Failed";
    }

    res.redirect("/");
}

const deleteQuestion = async(req,res) => {

    const {id} = req.params;

    const result = await questionsObj.deleteOne({_id : new ObjectId(id)});

    if(result.deletedCount){
        req.session.msg = "User Deleted Successfully!";
    }else{
        req.session.msg = "User Delete Failed";
    }

    res.redirect("/");
}

module.exports = {questionsGet,addquestion , addQuestionPOST , editQuestion, editQuestionPOST, editQuestion};