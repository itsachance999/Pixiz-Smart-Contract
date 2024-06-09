use anchor_lang::prelude::*;

#[error_code]
pub enum LevelManagerError {
    #[msg("Overflow in arithmetic operation")]
    MathOverflow,

    #[msg("Authority is invalid")]
    InvalidAuthority,

    #[msg("TokenStandard is invalid")]
    InvalidTokenStandard,

    #[msg("Launch time is invalid")]
    InvalidLaunchTime,

    #[msg("Fee wallet is invalid")]
    InvalidFeeWallet,

    #[msg("InvalidNftMintAddress")]
    InvalidNftMintAddress,

    #[msg("InvalidNftOwner")]
    InvalidNftOwner,

    #[msg("InvalidNftAmount")]
    InvalidNftAmount,

    #[msg("LimitItemsOverflow")]
    LimitItemsOverflow,

    #[msg("XpNotEnough")]
    XpNotEnough,
}
