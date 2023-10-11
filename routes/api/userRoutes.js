const router = require("express").Router();

const {
    getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend
} = require("../../controllers/userController");

router.route("/").get(getAllUsers);
router.route("/").post(createUser);

router.route("/:userId").get(getUserById);
router.route("/:userId").put(updateUser);
router.route("/:userId").delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend);
router.route("/:userId/friends/:friendId").delete(removeFriend);


module.exports = router;