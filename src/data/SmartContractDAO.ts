import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import vaultAbi from '../contracts/Vault.json';
import tokenAbi from '../contracts/Token.json';
import { parseEther } from '../helpers/etherUtils.helper';
import SmartContractError from './type';

dotenv.config();

class SmartContractDAO {
	private token_address: string;
	private vault_address: string;
	private withdrawer_private_key: string;
	private withdrawer_address: string;
	private provider: ethers.providers.JsonRpcProvider;
	constructor() {
		this.provider = new ethers.providers.JsonRpcProvider(
			"https://data-seed-prebsc-1-s1.binance.org:8545"
		);
		this.token_address = process.env.TOKEN_ADDRESS || '';
		this.vault_address = process.env.VAULT_ADDRESS || '';
		this.withdrawer_private_key = process.env.WITHDRAWER_PRIVATE_KEY || '';
		this.withdrawer_address = process.env.WITHDRAWER_ADDRESS || '';
	}
	async withdraw(address: string, amount: number) {
		try {
			const withdrawerWallet = new ethers.Wallet(this.withdrawer_private_key, this.provider);
			const vaultContract = new ethers.Contract(this.vault_address, vaultAbi, withdrawerWallet);
			const value = parseEther(amount);
			const withdrawTx = await vaultContract.withdraw(value, address);
			const withdrawReceipt = await withdrawTx.wait();
			return withdrawReceipt.transactionHash;

		} catch(error: SmartContractError) {
			if(error.code) {
				throw new Error(error.error.reason);
			}else {
				throw new Error("Something wrong");
				
			}
			
		}
	}
}
export default SmartContractDAO;