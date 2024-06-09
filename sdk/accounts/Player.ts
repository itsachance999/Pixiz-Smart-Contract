import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PlayerFields {
  authority: PublicKey
  playerBump: number
  playerNumber: BN
  paidAmount: BN
  level: BN
  exp: BN
  combat: BN
  speed: BN
  createAt: BN
}

export interface PlayerJSON {
  authority: string
  playerBump: number
  playerNumber: string
  paidAmount: string
  level: string
  exp: string
  combat: string
  speed: string
  createAt: string
}

export class Player {
  readonly authority: PublicKey
  readonly playerBump: number
  readonly playerNumber: BN
  readonly paidAmount: BN
  readonly level: BN
  readonly exp: BN
  readonly combat: BN
  readonly speed: BN
  readonly createAt: BN

  static readonly discriminator = Buffer.from([
    205, 222, 112, 7, 165, 155, 206, 218,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.u8("playerBump"),
    borsh.u64("playerNumber"),
    borsh.u64("paidAmount"),
    borsh.u64("level"),
    borsh.u64("exp"),
    borsh.u64("combat"),
    borsh.u64("speed"),
    borsh.i64("createAt"),
  ])

  constructor(fields: PlayerFields) {
    this.authority = fields.authority
    this.playerBump = fields.playerBump
    this.playerNumber = fields.playerNumber
    this.paidAmount = fields.paidAmount
    this.level = fields.level
    this.exp = fields.exp
    this.combat = fields.combat
    this.speed = fields.speed
    this.createAt = fields.createAt
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Player | null> {
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
  ): Promise<Array<Player | null>> {
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

  static decode(data: Buffer): Player {
    if (!data.slice(0, 8).equals(Player.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Player.layout.decode(data.slice(8))

    return new Player({
      authority: dec.authority,
      playerBump: dec.playerBump,
      playerNumber: dec.playerNumber,
      paidAmount: dec.paidAmount,
      level: dec.level,
      exp: dec.exp,
      combat: dec.combat,
      speed: dec.speed,
      createAt: dec.createAt,
    })
  }

  toJSON(): PlayerJSON {
    return {
      authority: this.authority.toString(),
      playerBump: this.playerBump,
      playerNumber: this.playerNumber.toString(),
      paidAmount: this.paidAmount.toString(),
      level: this.level.toString(),
      exp: this.exp.toString(),
      combat: this.combat.toString(),
      speed: this.speed.toString(),
      createAt: this.createAt.toString(),
    }
  }

  static fromJSON(obj: PlayerJSON): Player {
    return new Player({
      authority: new PublicKey(obj.authority),
      playerBump: obj.playerBump,
      playerNumber: new BN(obj.playerNumber),
      paidAmount: new BN(obj.paidAmount),
      level: new BN(obj.level),
      exp: new BN(obj.exp),
      combat: new BN(obj.combat),
      speed: new BN(obj.speed),
      createAt: new BN(obj.createAt),
    })
  }
}
