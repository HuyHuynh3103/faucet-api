import { APIReturn } from './controllers/helper';
import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import route from './routes/APIRoutes';
import bodyParser from 'body-parser';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req: Request, res: Response, next: NextFunction) {
	req.setTimeout(1000*45, function () {
		res.status(200).json(APIReturn(1, 'timeout'))
	})
	next()
})



route(app);



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});