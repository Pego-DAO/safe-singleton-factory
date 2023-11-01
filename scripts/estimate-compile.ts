import dotenv from "dotenv";
import { DeploymentEstimation, createDeploymentTransaction, estimateDeploymentTransaction } from './common';
import { runScript } from './utils';

dotenv.config()

async function runEstimateAndCompile() {
	const rpcUrl = process.argv[2] || process.env.RPC
	if (rpcUrl === undefined) throw "RPC environment variable must be defined"
    const deploymentEstimation: DeploymentEstimation = await estimateDeploymentTransaction(rpcUrl)
    const options = {
        gasPrice: deploymentEstimation.gasPrice.toNumber(),
        gasLimit: Math.round(deploymentEstimation.gasLimit.toNumber() * 1.4),
        nonce: 7 // TODO - if deployment wallet is the same as suitcase-contract, nonce is the current wallet nonce + 2. 
                 // If it is different, here is the nonce of suitcase-contract deployment wallet + 1.
    }
    await createDeploymentTransaction(deploymentEstimation.chainId, options)
}

runScript(runEstimateAndCompile)