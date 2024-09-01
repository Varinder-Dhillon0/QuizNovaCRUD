const db = require("./database")
const { ObjectId } = require("mongodb");

const usersObj = db.collection("users");

const usersGet = async(req,res) =>{
    const usersArr = await usersObj.find().toArray();

    console.log(usersArr);
    res.render("users_view.ejs", {usersArr : usersArr});
}

const addUser = (req,res) =>{
    res.render("users_add_view.ejs");
}

const addUserPOST = async(req,res) =>{
    const {firstname , lastname ,email , password, role } = req.body;
    const date = new Date();

    const result = await usersObj.insertOne({first_name : firstname , last_name : lastname , email : email, password : password, registered_at : date , roles : role});

    if(result.insertedId){
        req.session.msg = "User Added Successfully!";
    }else{
        req.session.msg = "User Add Failed";
    }

    res.redirect("/");
}

const editUsers = async(req,res) =>{
    const {id} = req.params;

    const userEdit = await usersObj.findOne({_id :new ObjectId(id) });
    res.render("users_edit_view" , {user : userEdit});
}

const editUsersPOST = async(req , res) =>{
    const {id,firstname , lastname ,email , password, role } = req.body;

    console.log(req.body);

    const result = await usersObj.updateOne({_id : new ObjectId(id)} , {$set : {first_name : firstname , last_name : lastname , email : email, password : password , roles : role}});

    if(result.modifiedCount){
        req.session.msg = "User Edited Successfully!";
    }else{
        req.session.msg = "User Edit Failed";
    }

    res.redirect("/");
}

const deleteUser = async(req,res) => {

    const {id} = req.params;

    const result = await usersObj.deleteOne({_id : new ObjectId(id)});

    if(result.deletedCount){
        req.session.msg = "User Deleted Successfully!";
    }else{
        req.session.msg = "User Delete Failed";
    }

    res.redirect("/");
}

module.exports = {usersGet,addUser , addUserPOST , editUsers, editUsersPOST, deleteUser};