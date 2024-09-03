const db = require("./database");
const { ObjectId } = require("mongodb");

// Get all achievements
const getAchievements = async (req, res) => {
    try {
        const achievements = await db.collection("achievements").find().toArray();
        console.log(achievements);
        res.render("achievements_view", { achievements : achievements });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving achievements");
    }
};

// Add a new achievement
const addAchievement = (req, res) => {
    res.render("achievements_add_view");
};

const addAchievementPOST = async (req, res) => {
    try {
        const { user_id, achievement_name, description, earned_at } = req.body;
        await db.collection("achievements").insertOne({
            user_id : user_id,
            achievement_name : achievement_name,
            description : description,
            earned_at : earned_at
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
        const {id} = req.params;
        const achievement = await db.collection("achievements").findOne({ _id: new ObjectId(id) });
        res.render("achievement_edit_view", { achievement });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving achievement");
    }
};

const editAchievementPOST = async (req, res) => {
    try {
        const {id,user_id, achievement_name, description, earned_at} = req.body;

        await db.collection("achievements").updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    user_id : user_id,
                    achievement_name : achievement_name,
                    description : description,
                    earned_at : earned_at
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
        const id = req.params.id;
        await db.collection("achievements").deleteOne({ _id: new ObjectId(id) });
        req.session.msg = "Achievement deleted successfully!";
        res.redirect("/achievement");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting achievement");
    }
};

module.exports = { getAchievements, addAchievement, addAchievementPOST, editAchievement, editAchievementPOST, deleteAchievement };
