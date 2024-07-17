const User = require("../Models/user")

const getUser = async(req, res) => {
    try {
        const loggedUser = req.user._id
        const filterUser = await User.find({_id: {$ne: loggedUser}}).select("-password").select("-salt")
        res.status(200).json(filterUser);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }

}

module.exports = getUser;