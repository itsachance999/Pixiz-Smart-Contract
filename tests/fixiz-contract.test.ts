import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PROGRAM_ID } from "../sdk/programId";
import { createPlayer, updatePlayer, initialize, update } from '../sdk/instructions';
import { AdminPanel, Player } from '../sdk/accounts';
import { FixizContract } from "../target/types/fixiz_contract";
const assert = require('chai').assert;

describe("fixiz-contract", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.FixizContract as Program<FixizContract>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
    assert.equal(true, true);
  });
});
