const db = require("./database");

// Get all achievements
const getAchievements = async (req, res) => {
    try {
        const achievements = await db.collection("achievements").find({}).toArray();
        res.render("achievements", { achievements });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving achievements");
    }
};

// Add a new achievement
const addAchievement = (req, res) => {
    res.render("achievement_add");
};

const addAchievementPOST = async (req, res) => {
    try {
        const { first_name, last_name, email, password, registered_at, quizzes_done_id, quizzes_created_id, roles } = req.body;
        await db.collection("achievements").insertOne({
            first_name,
            last_name,
            email,
            password,
            registered_at: new Date(registered_at),
            quizzes_done_id: quizzes_done_id.split(",").map(id => new db.ObjectId(id)),
            quizzes_created_id: quizzes_created_id.split(",").map(id => new db.ObjectId(id)),
            roles: roles.split(","),
        });
        req.session.msg = "Achievement added successfully!";
        res.redirect("/achievement");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding achievement");
    }
};

// Edit an achievement
const editAchievement = async (req, res) => {
    try {
        const id = new db.ObjectId(req.params.id);
        const achievement = await db.collection("achievements").findOne({ _id: id });
        res.render("achievement_edit", { achievement });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving achievement");
    }
};

const editAchievementPOST = async (req, res) => {
    try {
        const id = new db.ObjectId(req.body._id);
        const { first_name, last_name, email, password, registered_at, quizzes_done_id, quizzes_created_id, roles } = req.body;
        await db.collection("achievements").updateOne(
            { _id: id },
            {
                $set: {
                    first_name,
                    last_name,
                    email,
                    password,
                    registered_at: new Date(registered_at),
                    quizzes_done_id: quizzes_done_id.split(",").map(id => new db.ObjectId(id)),
                    quizzes_created_id: quizzes_created_id.split(",").map(id => new db.ObjectId(id)),
                    roles: roles.split(","),
                },
            }
        );
        req.session.msg = "Achievement updated successfully!";
        res.redirect("/achievement");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating achievement");
    }
};

// Delete an achievement
const deleteAchievement = async (req, res) => {
    try {
        const id = new db.ObjectId(req.params.id);
        await db.collection("achievements").deleteOne({ _id: id });
        req.session.msg = "Achievement deleted successfully!";
        res.redirect("/achievement");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting achievement");
    }
};

module.exports = { getAchievements, addAchievement, addAchievementPOST, editAchievement, editAchievementPOST, deleteAchievement };
