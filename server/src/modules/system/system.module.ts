import { SystemController } from "./system.controller";
import { SystemService } from "./system.service";

const systemService = new SystemService();
const systemController = new SystemController(systemService);

export { systemController, systemService };
