import { PlayerController } from "./player.controller";
import { PlayerService } from "./player.service";

const playerService = new PlayerService();
const playerController = new PlayerController(playerService);

export { playerController, playerService };
