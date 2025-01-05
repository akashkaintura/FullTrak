import { Router } from 'express';
import { MatchController } from '../controllers/match.controller';

const router = Router();

router.post('/', MatchController.createMatch);
router.get('/:id', MatchController.getMatchById);
router.get('/', MatchController.getAllMatches);
router.put('/:id', MatchController.updateMatch);

export default router;