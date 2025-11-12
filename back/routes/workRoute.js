import { Router } from "express";
import { getAllWorks, getSingleWork, registerWork, updateWork, deleteWork} from "../controllers/workController.js"


const workRouter = Router();

// workRouter.get("/",getAllWorks)
// workRouter.post("/register",registerWork)



// Route to get all works
workRouter.get('/', getAllWorks);

// Route to get a single work by ID
workRouter.get('/:id', getSingleWork);

// Route to register a new work
workRouter.post('/register', registerWork);

// Route to update an existing work
workRouter.put('/:id', updateWork);

// Route to delete a work by ID
workRouter.delete('/:id', deleteWork);





export default workRouter;




