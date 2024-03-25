import { addressOfAlice, getNotYetSignedTx } from "./samples.js"; // md-ignore

// ## Creating network providers

// Creating an API provider:

// ```
import { ApiNetworkProvider } from "@multiversx/sdk-network-providers";

const apiNetworkProvider = new ApiNetworkProvider("https://devnet-api.multiversx.com");
// ```

// Creating a Proxy provider:

// ```
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers";

const proxyNetworkProvider = new ProxyNetworkProvider("https://devnet-gateway.multiversx.com");
// ```

// Use the classes from `@multiversx/sdk-network-providers` **only as a starting point**. 
// As your dApp matures, make sure you **switch to using your own network provider**, tailored to your requirements 
// (whether deriving from the default ones or writing a new one, from scratch) that directly interacts with the MultiversX API (or Gateway).

// On this topic, please see [extending sdk-js](https://docs.multiversx.com/sdk-and-tools/sdk-js/extending-sdk-js).

// ## Fetching network parameters

// ```
const networkConfig = await apiNetworkProvider.getNetworkConfig();
console.log(networkConfig.MinGasPrice);
console.log(networkConfig.ChainID);
// ```

// ## Working with accounts

// ### Synchronizing an account object

// The following snippet fetches (from the Network) the **nonce** and the **balance** of an account, and updates the local representation of the account.

// ```
import { Account } from "@multiversx/sdk-core";

const alice = new Account(addressOfAlice);
const aliceOnNetwork = await apiNetworkProvider.getAccount(addressOfAlice);
alice.update(aliceOnNetwork);

console.log("Nonce:", alice.nonce);
console.log("Balance:", alice.balance.toString());
// ```

// ### Managing the sender nonce locally

// When sending a bunch of transactions, you usually have to first fetch the account nonce from the network (see above), then manage it locally (e.g. increment upon signing & broadcasting a transaction):

// ```
alice.incrementNonce();
console.log("Nonce:", alice.nonce);
// ```

// md-insert:transactionLegacyVsNext

// If you are using `sdk-core v13` or later, use `tx.nonce = ` to apply the nonce to a transaction. 
// For `sdk-core v12` or earlier, use the legacy `tx.setNonce()` to apply the nonce to a transaction.

// ```
const notYetSignedTx = getNotYetSignedTx(); // md-ignore

notYetSignedTx.nonce = alice.getNonceThenIncrement();
// ```

// For further reference, please see [nonce management](https://docs.multiversx.com/integrators/creating-transactions/#nonce-management).
