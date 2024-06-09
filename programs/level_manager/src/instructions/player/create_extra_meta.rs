use {crate::state::*, crate::error::*};
use anchor_lang::{prelude::*, solana_program::{ program::invoke, system_instruction}};
use anchor_spl::token::{self, Mint, Token, TokenAccount};

#[derive(Accounts)]
pub struct CreateExtraMeta<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    /// nft mint address.
    pub nft_mint: Box<Account<'info, Mint>>,

    #[account(
        init,
        payer = payer,
        space = ExtraMeta::LEN,
        seeds = [b"extra_meta", nft_mint.key().as_ref()],
        bump
    )]
    pub extra_meta: Box<Account<'info, ExtraMeta>>,

    pub system_program: Program<'info, System>,
}


pub fn create_extra_meta(ctx: Context<CreateExtraMeta>) -> Result<()> {
    let extra_meta = ctx.accounts.extra_meta.as_mut();
    
    extra_meta.nft_mint = ctx.accounts.nft_mint.key();
    extra_meta.extra_meta_bump = *ctx.bumps.get("extra_meta").unwrap();
    extra_meta.level = 0u64;
    extra_meta.exp = 0u64;
    extra_meta.combat = 0u64;
    extra_meta.speed = 0u64;
    Ok(())
}
