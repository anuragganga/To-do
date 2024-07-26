import Router from "express"
import {add_todo,delete_todo,edit_todo,get_todo} from "../controllers/todo.controller.js"

const router=Router();

router.route("/todo").post(add_todo)
router.route("/todo").delete(delete_todo)
router.route("/todo").patch(edit_todo)
router.route("/todo").get(get_todo)

export default router;