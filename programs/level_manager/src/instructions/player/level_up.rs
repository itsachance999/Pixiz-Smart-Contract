use {crate::state::*, crate::error::*};
use anchor_lang::{prelude::*, solana_program::{ program::invoke, system_instruction}};

use anchor_spl::token::{self, Mint, Token, TokenAccount};

#[derive(Accounts)]
pub struct LevelUp<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"admin_panel"],
        bump,
        constraint = payment_wallet.key() == admin_panel.payment_wallet @ LevelManagerError::InvalidFeeWallet
    )]
    pub admin_panel: Box<Account<'info, AdminPanel>>,

    #[account(
        mut,
        seeds = [b"player", authority.key().as_ref()],
        bump,
        constraint = nft_token_account.owner == authority.key() @ LevelManagerError::InvalidNftOwner,
        constraint = nft_token_account.mint == nft_mint.key() @ LevelManagerError::InvalidNftMintAddress,
        constraint = nft_token_account.amount > 0 @ LevelManagerError::InvalidNftAmount,
    )]
    pub player: Box<Account<'info, Player>>,

    /// CHECK:
    #[account(mut)]
    pub payment_wallet: UncheckedAccount<'info>,
    
    /// nft mint address.
    pub nft_mint: Box<Account<'info, Mint>>,

    /// user's token account address.
    pub nft_token_account: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        seeds = [b"extra_meta", nft_mint.key().as_ref()],
        bump
    )]
    pub extra_meta: Box<Account<'info, ExtraMeta>>,

    /// The [System] program.
    pub system_program: Program<'info, System>,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct LevelUpParams {
    pub exploration: u64,
    pub combat: u64,
    pub speed: u64,
}

pub fn level_up(ctx: Context<LevelUp>, params: &LevelUpParams) -> Result<()> {
    let admin_panel = ctx.accounts.admin_panel.as_mut();
    let player = ctx.accounts.player.as_mut();
    let extra_meta = ctx.accounts.extra_meta.as_mut();
    let system_program = ctx.accounts.system_program.to_account_info();

    let sum_items = params.exploration + params.combat + params.speed;
    require!(admin_panel.limit_items_allocated >= sum_items, LevelManagerError::LimitItemsOverflow);

    require!(admin_panel.max_xp <= player.xp, LevelManagerError::XpNotEnough);

    let payable_exp = params.exploration.checked_mul(admin_panel.fee_exploration).ok_or(LevelManagerError::MathOverflow)?;
    let payable_combat = params.combat.checked_mul(admin_panel.fee_combat).ok_or(LevelManagerError::MathOverflow)?;
    let payable_speed = params.speed.checked_mul(admin_panel.fee_speed).ok_or(LevelManagerError::MathOverflow)?;
    let payable_amount = (payable_exp.checked_add(payable_combat).ok_or(LevelManagerError::MathOverflow)?).checked_add(payable_speed).ok_or(LevelManagerError::MathOverflow)?;

    if payable_amount > 0 {
        invoke(
            &system_instruction::transfer(ctx.accounts.authority.key, ctx.accounts.payment_wallet.key, payable_amount),
            &[ctx.accounts.authority.to_account_info(), ctx.accounts.payment_wallet.to_account_info(), system_program],
        )?;
    }

    player.xp = 0u64;
    extra_meta.exp += params.exploration;
    extra_meta.combat += params.combat;
    extra_meta.speed += params.speed;
    extra_meta.level += 1u64;

    admin_panel.total_paid_amount += payable_amount;
    
    Ok(())
}
