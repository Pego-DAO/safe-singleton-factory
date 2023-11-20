# Suitcase on Pego Network
This project is a fork from Gnosis Safe Global. The Suitcase project consists of the following 8 repositories. To deploy the project, go to each repo by following the sequence below and refer to steps stated in `pego-deployment.md`, which can be found in each repo.

1. **[safe-singleton-factory](https://github.com/Pego-DAO/safe-singleton-factory)** - Currently viewing
2. [suitcase-contract](https://github.com/Pego-DAO/suitcase-contract)
3. [safe-transaction-service](https://github.com/Pego-DAO/safe-transaction-service)
4. [safe-client-gateway](https://github.com/Pego-DAO/safe-client-gateway)
5. [safe-config-service](https://github.com/Pego-DAO/safe-config-service)
6. [suitcase-deployment](https://github.com/Pego-DAO/suitcase-deployment)
7. [suitcase-sdk](https://github.com/Pego-DAO/suitcase-sdk)
8. [suitcase-ui](https://github.com/Pego-DAO/suitcase-ui)

## safe-singleton-factory
The goal of using this repo, is to build `deployment.json` file for a network chain.

1. Create a `.env` file and copy the following code and provide value accordingly.
```
MNEMONIC= # mnemonic seed of the deployment wallet
RPC= # rpc of the target deployment chain
```
2. Go to file `scripts/estimate-compile.ts`, look for `nonce` field and increase the value by current_deployment_wallet_nonce + 2. 

*For example, if the nonce of wallet using for deployment is currently 15, set the value to 17; if the nonce of deplyment wallet is currently 3, set this value to 5; if the nonce of deployment wallet is currently 0, set this value to 2.*

```
async function runEstimateAndCompile() {
	const rpcUrl = process.argv[2] || process.env.RPC
	if (rpcUrl === undefined) throw "RPC environment variable must be defined"
    const deploymentEstimation: DeploymentEstimation = await estimateDeploymentTransaction(rpcUrl)
    const options = {
        gasPrice: deploymentEstimation.gasPrice.toNumber(),
        gasLimit: Math.round(deploymentEstimation.gasLimit.toNumber() * 1.4),
THIS VALUE --> nonce: 5
    }
    await createDeploymentTransaction(deploymentEstimation.chainId, options)
}
```
3. Install dependencies by running `yarn`.
4. Run `yarn estimate-compile`. After completed successfully, the file should be found on path `artifacts/<network id>/deployment.json`
5. Copy `deployment.json` to root folder of [suitcase-contract](https://github.com/Pego-DAO/suitcase-contract) repo.