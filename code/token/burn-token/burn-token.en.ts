import { clusterApiUrl, Connection, PublicKey, Keypair, Transaction } from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import * as bs58 from "bs58";

(async () => {
  // connection
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
  const feePayer = Keypair.fromSecretKey(
    bs58.decode("588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2")
  );

  // G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
  const alice = Keypair.fromSecretKey(
    bs58.decode("4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp")
  );

  const mintPubkey = new PublicKey("54dQ8cfHsW1YfKYpmdVZhWpb9iSi6Pac82Nf7sg3bVb");

  const tokenAccountPubkey = new PublicKey("DRS5CSgPQp4uvPPcUA34tckfYFNUPNBJi77fVbnSfQHr");

  let tx = new Transaction().add(
    Token.createBurnInstruction(
      TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
      mintPubkey, // mint
      tokenAccountPubkey, // from (should be a token account)
      alice.publicKey, // owner of token account
      [], // for multisig account, leave empty.
      1e8 // amount, if your deciamls is 8, 10^8 for 1 token
    )
  );

  console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice /* fee payer + token authority */])}`);
})();
