export type CustomError =
  | MathOverflow
  | InvalidAuthority
  | InvalidTokenStandard
  | InvalidLaunchTime
  | InvalidFeeWallet

export class MathOverflow extends Error {
  static readonly code = 6000
  readonly code = 6000
  readonly name = "MathOverflow"
  readonly msg = "Overflow in arithmetic operation"

  constructor(readonly logs?: string[]) {
    super("6000: Overflow in arithmetic operation")
  }
}

export class InvalidAuthority extends Error {
  static readonly code = 6001
  readonly code = 6001
  readonly name = "InvalidAuthority"
  readonly msg = "Authority is invalid"

  constructor(readonly logs?: string[]) {
    super("6001: Authority is invalid")
  }
}

export class InvalidTokenStandard extends Error {
  static readonly code = 6002
  readonly code = 6002
  readonly name = "InvalidTokenStandard"
  readonly msg = "TokenStandard is invalid"

  constructor(readonly logs?: string[]) {
    super("6002: TokenStandard is invalid")
  }
}

export class InvalidLaunchTime extends Error {
  static readonly code = 6003
  readonly code = 6003
  readonly name = "InvalidLaunchTime"
  readonly msg = "Launch time is invalid"

  constructor(readonly logs?: string[]) {
    super("6003: Launch time is invalid")
  }
}

export class InvalidFeeWallet extends Error {
  static readonly code = 6004
  readonly code = 6004
  readonly name = "InvalidFeeWallet"
  readonly msg = "Fee wallet is invalid"

  constructor(readonly logs?: string[]) {
    super("6004: Fee wallet is invalid")
  }
}

export function fromCode(code: number, logs?: string[]): CustomError | null {
  switch (code) {
    case 6000:
      return new MathOverflow(logs)
    case 6001:
      return new InvalidAuthority(logs)
    case 6002:
      return new InvalidTokenStandard(logs)
    case 6003:
      return new InvalidLaunchTime(logs)
    case 6004:
      return new InvalidFeeWallet(logs)
  }

  return null
}
