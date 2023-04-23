import express from "express";
import { login,  signup, updatePassword, updateUser} from '../controllers/user.js'

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/update", updateUser);
router.post("/updatepassword", updatePassword);

export default router;
