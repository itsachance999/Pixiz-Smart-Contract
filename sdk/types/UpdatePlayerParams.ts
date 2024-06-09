import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UpdatePlayerParamsFields {
  paidAmount: BN
  level: BN
  exp: BN
  combat: BN
  speed: BN
}

export interface UpdatePlayerParamsJSON {
  paidAmount: string
  level: string
  exp: string
  combat: string
  speed: string
}

export class UpdatePlayerParams {
  readonly paidAmount: BN
  readonly level: BN
  readonly exp: BN
  readonly combat: BN
  readonly speed: BN

  constructor(fields: UpdatePlayerParamsFields) {
    this.paidAmount = fields.paidAmount
    this.level = fields.level
    this.exp = fields.exp
    this.combat = fields.combat
    this.speed = fields.speed
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("paidAmount"),
        borsh.u64("level"),
        borsh.u64("exp"),
        borsh.u64("combat"),
        borsh.u64("speed"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UpdatePlayerParams({
      paidAmount: obj.paidAmount,
      level: obj.level,
      exp: obj.exp,
      combat: obj.combat,
      speed: obj.speed,
    })
  }

  static toEncodable(fields: UpdatePlayerParamsFields) {
    return {
      paidAmount: fields.paidAmount,
      level: fields.level,
      exp: fields.exp,
      combat: fields.combat,
      speed: fields.speed,
    }
  }

  toJSON(): UpdatePlayerParamsJSON {
    return {
      paidAmount: this.paidAmount.toString(),
      level: this.level.toString(),
      exp: this.exp.toString(),
      combat: this.combat.toString(),
      speed: this.speed.toString(),
    }
  }

  static fromJSON(obj: UpdatePlayerParamsJSON): UpdatePlayerParams {
    return new UpdatePlayerParams({
      paidAmount: new BN(obj.paidAmount),
      level: new BN(obj.level),
      exp: new BN(obj.exp),
      combat: new BN(obj.combat),
      speed: new BN(obj.speed),
    })
  }

  toEncodable() {
    return UpdatePlayerParams.toEncodable(this)
  }
}
