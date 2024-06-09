import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface AdminPanelFields {
  adminWallet: PublicKey
  adminpanelBump: number
  playerCount: BN
  feeCreatePlayer: BN
  paymentWallet: PublicKey
  paymentTokenVault: PublicKey
  paymentTokenMint: PublicKey
  totalPaidAmount: BN
  rule: Array<Array<BN>>
  xpRule: Array<Array<BN>>
}

export interface AdminPanelJSON {
  adminWallet: string
  adminpanelBump: number
  playerCount: string
  feeCreatePlayer: string
  paymentWallet: string
  paymentTokenVault: string
  paymentTokenMint: string
  totalPaidAmount: string
  rule: Array<Array<string>>
  xpRule: Array<Array<string>>
}

export class AdminPanel {
  readonly adminWallet: PublicKey
  readonly adminpanelBump: number
  readonly playerCount: BN
  readonly feeCreatePlayer: BN
  readonly paymentWallet: PublicKey
  readonly paymentTokenVault: PublicKey
  readonly paymentTokenMint: PublicKey
  readonly totalPaidAmount: BN
  readonly rule: Array<Array<BN>>
  readonly xpRule: Array<Array<BN>>

  static readonly discriminator = Buffer.from([
    144, 173, 11, 253, 22, 79, 6, 36,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("adminWallet"),
    borsh.u8("adminpanelBump"),
    borsh.u64("playerCount"),
    borsh.u64("feeCreatePlayer"),
    borsh.publicKey("paymentWallet"),
    borsh.publicKey("paymentTokenVault"),
    borsh.publicKey("paymentTokenMint"),
    borsh.u64("totalPaidAmount"),
    borsh.array(borsh.array(borsh.u64(), 4), 20, "rule"),
    borsh.array(borsh.array(borsh.u64(), 4), 20, "xpRule"),
  ])

  constructor(fields: AdminPanelFields) {
    this.adminWallet = fields.adminWallet
    this.adminpanelBump = fields.adminpanelBump
    this.playerCount = fields.playerCount
    this.feeCreatePlayer = fields.feeCreatePlayer
    this.paymentWallet = fields.paymentWallet
    this.paymentTokenVault = fields.paymentTokenVault
    this.paymentTokenMint = fields.paymentTokenMint
    this.totalPaidAmount = fields.totalPaidAmount
    this.rule = fields.rule
    this.xpRule = fields.xpRule
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<AdminPanel | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(programId)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[],
    programId: PublicKey = PROGRAM_ID
  ): Promise<Array<AdminPanel | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(programId)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): AdminPanel {
    if (!data.slice(0, 8).equals(AdminPanel.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = AdminPanel.layout.decode(data.slice(8))

    return new AdminPanel({
      adminWallet: dec.adminWallet,
      adminpanelBump: dec.adminpanelBump,
      playerCount: dec.playerCount,
      feeCreatePlayer: dec.feeCreatePlayer,
      paymentWallet: dec.paymentWallet,
      paymentTokenVault: dec.paymentTokenVault,
      paymentTokenMint: dec.paymentTokenMint,
      totalPaidAmount: dec.totalPaidAmount,
      rule: dec.rule,
      xpRule: dec.xpRule,
    })
  }

  toJSON(): AdminPanelJSON {
    return {
      adminWallet: this.adminWallet.toString(),
      adminpanelBump: this.adminpanelBump,
      playerCount: this.playerCount.toString(),
      feeCreatePlayer: this.feeCreatePlayer.toString(),
      paymentWallet: this.paymentWallet.toString(),
      paymentTokenVault: this.paymentTokenVault.toString(),
      paymentTokenMint: this.paymentTokenMint.toString(),
      totalPaidAmount: this.totalPaidAmount.toString(),
      rule: this.rule.map((item) => item.map((item) => item.toString())),
      xpRule: this.xpRule.map((item) => item.map((item) => item.toString())),
    }
  }

  static fromJSON(obj: AdminPanelJSON): AdminPanel {
    return new AdminPanel({
      adminWallet: new PublicKey(obj.adminWallet),
      adminpanelBump: obj.adminpanelBump,
      playerCount: new BN(obj.playerCount),
      feeCreatePlayer: new BN(obj.feeCreatePlayer),
      paymentWallet: new PublicKey(obj.paymentWallet),
      paymentTokenVault: new PublicKey(obj.paymentTokenVault),
      paymentTokenMint: new PublicKey(obj.paymentTokenMint),
      totalPaidAmount: new BN(obj.totalPaidAmount),
      rule: obj.rule.map((item) => item.map((item) => new BN(item))),
      xpRule: obj.xpRule.map((item) => item.map((item) => new BN(item))),
    })
  }
}
