import { Router } from 'express';
import PlayerController from '../controllers/player.controller';

const router = Router();

router.post('/', PlayerController.createPlayer);
router.get('/:playerId', PlayerController.getPlayerById);
router.get('/search', PlayerController.searchPlayers);

export default router;