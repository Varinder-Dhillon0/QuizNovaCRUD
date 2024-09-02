const db = require("./database");
const { ObjectId } = require("mongodb");

const statsObj = db.collection("stats");

const statsGet = async (req, res) => {
    const statsArr = await statsObj.find().toArray();
    res.render("stats_view.ejs", { stats: statsArr });
};

const addStat = (req, res) => {
    res.render("stats_add_view.ejs");
};

const addStatPOST = async (req, res) => {
    const { quiz_id, user_id, score, completed_at } = req.body;

    const result = await statsObj.insertOne({
        quiz_id: new ObjectId(quiz_id),
        completed_users: [
            {
                user_id: new ObjectId(user_id),
                score: Number(score),
                completed_at: new Date(completed_at)
            }
        ]
    });

    if (result.insertedId) {
        req.session.msg = "Stat Added Successfully!";
    } else {
        req.session.msg = "Stat Add Failed";
    }

    res.redirect("/stat");
};

const editStat = async (req, res) => {
    const { id } = req.params;

    const statEdit = await statsObj.findOne({ _id: new ObjectId(id) });
    res.render("stats_edit_view", { stat: statEdit });
};

const editStatPOST = async (req, res) => {
    const { id, quiz_id, user_id, score, completed_at } = req.body;

    const result = await statsObj.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                quiz_id: new ObjectId(quiz_id),
                completed_users: [
                    {
                        user_id: new ObjectId(user_id),
                        score: Number(score),
                        completed_at: new Date(completed_at)
                    }
                ]
            }
        }
    );

    if (result.modifiedCount) {
        req.session.msg = "Stat Edited Successfully!";
    } else {
        req.session.msg = "Stat Edit Failed";
    }

    res.redirect("/stat");
};

const deleteStat = async (req, res) => {
    const { id } = req.params;

    const result = await statsObj.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount) {
        req.session.msg = "Stat Deleted Successfully!";
    } else {
        req.session.msg = "Stat Delete Failed";
    }

    res.redirect("/stat");
};

module.exports = { statsGet, addStat, addStatPOST, editStat, editStatPOST, deleteStat };
 