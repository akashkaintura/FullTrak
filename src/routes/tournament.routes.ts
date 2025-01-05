import { Router } from 'express';
import TournamentController from '../controllers/tournament.controller';

const router = Router();

router.post('/', TournamentController.createTournament);
router.get('/:tournamentId', TournamentController.getTournamentById);

export default router;