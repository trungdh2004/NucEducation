import { Router } from "express";
import { categoryController } from "./category.module";

const categoryRouter = Router();

categoryRouter.post("/paging", categoryController.pagingCategory);
categoryRouter.post("/create", categoryController.createCategory);
categoryRouter.post("/update/:id", categoryController.updateCategory);
categoryRouter.post("/delete/:id", categoryController.deleteCategory);
categoryRouter.post("/unDelete/:id", categoryController.unDeleteCategory);
categoryRouter.get("/getById/:id", categoryController.getOne);

export default categoryRouter;
