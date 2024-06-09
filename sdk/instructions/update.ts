import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateArgs {
  params: types.UpdateParamsFields
}

export interface UpdateAccounts {
  adminWallet: PublicKey
  adminpanel: PublicKey
}

export const layout = borsh.struct([types.UpdateParams.layout("params")])

export function update(
  args: UpdateArgs,
  accounts: UpdateAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.adminWallet, isSigner: true, isWritable: true },
    { pubkey: accounts.adminpanel, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([219, 200, 88, 176, 158, 63, 253, 127])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      params: types.UpdateParams.toEncodable(args.params),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
