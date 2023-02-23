import { Request, Response } from "express";
import SmartContractDAO from "../data/SmartContractDAO";
import { APIReturn } from "./helper";
async function withdraw(req: Request, res: Response) {
    try {
        // get address, amount from request body
        let { address, amount } = req.body;
        if (!address || !amount) {
            console.error("Missing field");
            return res.status(400).json(APIReturn(101, "Bad Request"));
        }
        console.log("\nCalling Smart Contract\n");
        let dao = new SmartContractDAO();
        let trans = await dao.withdraw(address, amount);
        console.log(`Transaction hash:    ${trans}`);
        return res.status(200).json(
            APIReturn(
                0,
                {
                    "to": address,
                    "amount": amount,
                    "txHash": trans,
                },
                "success"
            )
        );
    } catch (error) {
        console.error("Error",error);
        return res.status(500).json(APIReturn(101, 'Something wrong'));
    }
}

export default {
	withdraw
}
