use anchor_lang::{
    prelude::*,
    solana_program::{program::invoke, system_instruction},
};
use {crate::error::*, crate::state::*};

#[derive(Accounts)]
pub struct CreatePlayer<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = Player::LEN,
        seeds = [b"player", authority.key().as_ref()],
        bump
    )]
    pub player: Box<Account<'info, Player>>,

    pub system_program: Program<'info, System>,
}

pub fn create_player(ctx: Context<CreatePlayer>) -> Result<()> {
    let player = ctx.accounts.player.as_mut();

    player.authority = ctx.accounts.authority.key();
    player.player_bump = *ctx.bumps.get("player").unwrap();
    player.xp = 0u64;
    player.paid_amount = 0u64;
    Ok(())
}
