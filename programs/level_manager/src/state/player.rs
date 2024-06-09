use anchor_lang::prelude::*;

#[account]
#[derive(Default, Debug)]
pub struct Player {
    pub player_bump: u8,
    pub authority: Pubkey,

    pub xp: u64,
    pub paid_amount: u64,
}

impl Player {
    pub const LEN: usize = 8 + std::mem::size_of::<Player>();
}
