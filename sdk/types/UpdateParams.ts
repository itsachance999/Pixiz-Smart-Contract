import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UpdateParamsFields {
  adminWallet: PublicKey
  paymentWallet: PublicKey
  paymentTokenVault: PublicKey
  paymentTokenMint: PublicKey
  feeCreatePlayer: BN
  totalPaidAmount: BN
  rule: Array<Array<BN>>
  xpRule: Array<Array<BN>>
}

export interface UpdateParamsJSON {
  adminWallet: string
  paymentWallet: string
  paymentTokenVault: string
  paymentTokenMint: string
  feeCreatePlayer: string
  totalPaidAmount: string
  rule: Array<Array<string>>
  xpRule: Array<Array<string>>
}

export class UpdateParams {
  readonly adminWallet: PublicKey
  readonly paymentWallet: PublicKey
  readonly paymentTokenVault: PublicKey
  readonly paymentTokenMint: PublicKey
  readonly feeCreatePlayer: BN
  readonly totalPaidAmount: BN
  readonly rule: Array<Array<BN>>
  readonly xpRule: Array<Array<BN>>

  constructor(fields: UpdateParamsFields) {
    this.adminWallet = fields.adminWallet
    this.paymentWallet = fields.paymentWallet
    this.paymentTokenVault = fields.paymentTokenVault
    this.paymentTokenMint = fields.paymentTokenMint
    this.feeCreatePlayer = fields.feeCreatePlayer
    this.totalPaidAmount = fields.totalPaidAmount
    this.rule = fields.rule
    this.xpRule = fields.xpRule
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("adminWallet"),
        borsh.publicKey("paymentWallet"),
        borsh.publicKey("paymentTokenVault"),
        borsh.publicKey("paymentTokenMint"),
        borsh.u64("feeCreatePlayer"),
        borsh.u64("totalPaidAmount"),
        borsh.array(borsh.array(borsh.u64(), 4), 20, "rule"),
        borsh.array(borsh.array(borsh.u64(), 4), 20, "xpRule"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UpdateParams({
      adminWallet: obj.adminWallet,
      paymentWallet: obj.paymentWallet,
      paymentTokenVault: obj.paymentTokenVault,
      paymentTokenMint: obj.paymentTokenMint,
      feeCreatePlayer: obj.feeCreatePlayer,
      totalPaidAmount: obj.totalPaidAmount,
      rule: obj.rule,
      xpRule: obj.xpRule,
    })
  }

  static toEncodable(fields: UpdateParamsFields) {
    return {
      adminWallet: fields.adminWallet,
      paymentWallet: fields.paymentWallet,
      paymentTokenVault: fields.paymentTokenVault,
      paymentTokenMint: fields.paymentTokenMint,
      feeCreatePlayer: fields.feeCreatePlayer,
      totalPaidAmount: fields.totalPaidAmount,
      rule: fields.rule,
      xpRule: fields.xpRule,
    }
  }

  toJSON(): UpdateParamsJSON {
    return {
      adminWallet: this.adminWallet.toString(),
      paymentWallet: this.paymentWallet.toString(),
      paymentTokenVault: this.paymentTokenVault.toString(),
      paymentTokenMint: this.paymentTokenMint.toString(),
      feeCreatePlayer: this.feeCreatePlayer.toString(),
      totalPaidAmount: this.totalPaidAmount.toString(),
      rule: this.rule.map((item) => item.map((item) => item.toString())),
      xpRule: this.xpRule.map((item) => item.map((item) => item.toString())),
    }
  }

  static fromJSON(obj: UpdateParamsJSON): UpdateParams {
    return new UpdateParams({
      adminWallet: new PublicKey(obj.adminWallet),
      paymentWallet: new PublicKey(obj.paymentWallet),
      paymentTokenVault: new PublicKey(obj.paymentTokenVault),
      paymentTokenMint: new PublicKey(obj.paymentTokenMint),
      feeCreatePlayer: new BN(obj.feeCreatePlayer),
      totalPaidAmount: new BN(obj.totalPaidAmount),
      rule: obj.rule.map((item) => item.map((item) => new BN(item))),
      xpRule: obj.xpRule.map((item) => item.map((item) => new BN(item))),
    })
  }

  toEncodable() {
    return UpdateParams.toEncodable(this)
  }
}
