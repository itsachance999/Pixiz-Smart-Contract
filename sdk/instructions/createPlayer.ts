import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CreatePlayerAccounts {
  creator: PublicKey
  adminpanel: PublicKey
  paymentWallet: PublicKey
  player: PublicKey
  systemProgram: PublicKey
}

export function createPlayer(
  accounts: CreatePlayerAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.creator, isSigner: true, isWritable: true },
    { pubkey: accounts.adminpanel, isSigner: false, isWritable: true },
    { pubkey: accounts.paymentWallet, isSigner: false, isWritable: true },
    { pubkey: accounts.player, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([19, 178, 189, 216, 159, 134, 0, 192])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
