import { Express } from 'express';
import APIcontroller from "../controllers/APIcontroller";

function route(app: Express){
	app.post('/api/withdraw', APIcontroller.withdraw);
}


export default route;