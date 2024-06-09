use anchor_lang::prelude::*;

#[account]
#[derive(Default, Debug)]
pub struct ExtraMeta {
    pub nft_mint: Pubkey,
    pub extra_meta_bump: u8,
    pub level: u64,
    pub exp: u64,
    pub combat: u64,
    pub speed: u64,
}

impl ExtraMeta {
    pub const LEN: usize = 8 + std::mem::size_of::<ExtraMeta>();
}
