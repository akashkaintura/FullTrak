import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

router.post('/', TeamController.createTeam);
router.get('/:teamId', TeamController.getTeamById);

export default router;