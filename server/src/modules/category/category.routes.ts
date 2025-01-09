import { Router } from "express";
import { categoryController } from "./category.module";
import authorization from "../../middleware/authorization";

const categoryRouter = Router();

categoryRouter.post("/paging", categoryController.pagingCategory);
categoryRouter.post(
  "/create",
  authorization,
  categoryController.createCategory
);
categoryRouter.put(
  "/update/:id",
  authorization,
  categoryController.updateCategory
);
categoryRouter.delete(
  "/delete/:id",
  authorization,
  categoryController.deleteCategory
);
categoryRouter.delete(
  "/unDelete/:id",
  authorization,
  categoryController.unDeleteCategory
);
categoryRouter.get("/getById/:id", categoryController.getOne);
categoryRouter.get("/getAll", categoryController.getAll);

export default categoryRouter;
