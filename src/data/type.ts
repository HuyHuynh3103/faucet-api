import { ethers } from "ethers"

type SmartContractError =  Error & {
	reason?: string
	error?: {
		reason?: string
	},
	code: ethers.errors
} & any & unknown
export default SmartContractError