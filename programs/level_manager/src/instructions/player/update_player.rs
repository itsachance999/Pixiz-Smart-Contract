use {crate::state::*, crate::error::*};
use anchor_lang::{prelude::*, solana_program::{ program::invoke, system_instruction}};


#[derive(Accounts)]
pub struct UpdatePlayer<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"admin_panel"],
        bump,
        constraint = authority.key() == admin_panel.backend_wallet @ LevelManagerError::InvalidAuthority
    )]
    pub admin_panel: Box<Account<'info, AdminPanel>>,

    #[account(
        mut,
        seeds = [b"player", player.authority.as_ref()],
        bump
    )]
    pub player: Box<Account<'info, Player>>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone)]
pub struct UpdatePlayerParams {
    pub xp: u64,
}

pub fn update_player(ctx: Context<UpdatePlayer>, params: &UpdatePlayerParams) -> Result<()> {
    let player = ctx.accounts.player.as_mut();
    player.xp = params.xp;
    
    Ok(())
}
