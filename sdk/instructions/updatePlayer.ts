import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdatePlayerArgs {
  params: types.UpdatePlayerParamsFields
}

export interface UpdatePlayerAccounts {
  creator: PublicKey
  adminpanel: PublicKey
  paymentWallet: PublicKey
  player: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([types.UpdatePlayerParams.layout("params")])

export function updatePlayer(
  args: UpdatePlayerArgs,
  accounts: UpdatePlayerAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.creator, isSigner: true, isWritable: true },
    { pubkey: accounts.adminpanel, isSigner: false, isWritable: true },
    { pubkey: accounts.paymentWallet, isSigner: false, isWritable: true },
    { pubkey: accounts.player, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([188, 237, 209, 245, 60, 160, 16, 126])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      params: types.UpdatePlayerParams.toEncodable(args.params),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
