import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface InitializeParamsFields {
  adminWallet: PublicKey
  paymentWallet: PublicKey
  paymentTokenVault: PublicKey
  paymentTokenMint: PublicKey
  totalPaidAmount: BN
  rule: Array<Array<BN>>
  xpRule: Array<Array<BN>>
  feeCreatePlayer: BN
}

export interface InitializeParamsJSON {
  adminWallet: string
  paymentWallet: string
  paymentTokenVault: string
  paymentTokenMint: string
  totalPaidAmount: string
  rule: Array<Array<string>>
  xpRule: Array<Array<string>>
  feeCreatePlayer: string
}

export class InitializeParams {
  readonly adminWallet: PublicKey
  readonly paymentWallet: PublicKey
  readonly paymentTokenVault: PublicKey
  readonly paymentTokenMint: PublicKey
  readonly totalPaidAmount: BN
  readonly rule: Array<Array<BN>>
  readonly xpRule: Array<Array<BN>>
  readonly feeCreatePlayer: BN

  constructor(fields: InitializeParamsFields) {
    this.adminWallet = fields.adminWallet
    this.paymentWallet = fields.paymentWallet
    this.paymentTokenVault = fields.paymentTokenVault
    this.paymentTokenMint = fields.paymentTokenMint
    this.totalPaidAmount = fields.totalPaidAmount
    this.rule = fields.rule
    this.xpRule = fields.xpRule
    this.feeCreatePlayer = fields.feeCreatePlayer
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("adminWallet"),
        borsh.publicKey("paymentWallet"),
        borsh.publicKey("paymentTokenVault"),
        borsh.publicKey("paymentTokenMint"),
        borsh.u64("totalPaidAmount"),
        borsh.array(borsh.array(borsh.u64(), 4), 20, "rule"),
        borsh.array(borsh.array(borsh.u64(), 4), 20, "xpRule"),
        borsh.u64("feeCreatePlayer"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new InitializeParams({
      adminWallet: obj.adminWallet,
      paymentWallet: obj.paymentWallet,
      paymentTokenVault: obj.paymentTokenVault,
      paymentTokenMint: obj.paymentTokenMint,
      totalPaidAmount: obj.totalPaidAmount,
      rule: obj.rule,
      xpRule: obj.xpRule,
      feeCreatePlayer: obj.feeCreatePlayer,
    })
  }

  static toEncodable(fields: InitializeParamsFields) {
    return {
      adminWallet: fields.adminWallet,
      paymentWallet: fields.paymentWallet,
      paymentTokenVault: fields.paymentTokenVault,
      paymentTokenMint: fields.paymentTokenMint,
      totalPaidAmount: fields.totalPaidAmount,
      rule: fields.rule,
      xpRule: fields.xpRule,
      feeCreatePlayer: fields.feeCreatePlayer,
    }
  }

  toJSON(): InitializeParamsJSON {
    return {
      adminWallet: this.adminWallet.toString(),
      paymentWallet: this.paymentWallet.toString(),
      paymentTokenVault: this.paymentTokenVault.toString(),
      paymentTokenMint: this.paymentTokenMint.toString(),
      totalPaidAmount: this.totalPaidAmount.toString(),
      rule: this.rule.map((item) => item.map((item) => item.toString())),
      xpRule: this.xpRule.map((item) => item.map((item) => item.toString())),
      feeCreatePlayer: this.feeCreatePlayer.toString(),
    }
  }

  static fromJSON(obj: InitializeParamsJSON): InitializeParams {
    return new InitializeParams({
      adminWallet: new PublicKey(obj.adminWallet),
      paymentWallet: new PublicKey(obj.paymentWallet),
      paymentTokenVault: new PublicKey(obj.paymentTokenVault),
      paymentTokenMint: new PublicKey(obj.paymentTokenMint),
      totalPaidAmount: new BN(obj.totalPaidAmount),
      rule: obj.rule.map((item) => item.map((item) => new BN(item))),
      xpRule: obj.xpRule.map((item) => item.map((item) => new BN(item))),
      feeCreatePlayer: new BN(obj.feeCreatePlayer),
    })
  }

  toEncodable() {
    return InitializeParams.toEncodable(this)
  }
}
