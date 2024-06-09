use {anchor_lang::prelude::*, crate::state::*};

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub admin_wallet: Signer<'info>,

    #[account(
        init,
        payer = admin_wallet,
        space = AdminPanel::LEN,
        seeds = [b"admin_panel"],
        bump
    )]
    pub admin_panel: Box<Account<'info, AdminPanel>>,

    pub system_program: Program<'info, System>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone)]
pub struct InitializeParams {
    pub admin_wallet: Pubkey,
    pub backend_wallet: Pubkey,
    pub payment_wallet: Pubkey,
    pub fee_exploration: u64,
    pub fee_combat: u64,
    pub fee_speed: u64,
    pub max_xp: u64,
    pub limit_items_allocated: u64,
}

pub fn initialize(ctx: Context<Initialize>, params: &InitializeParams) -> Result<()> {
    let admin_panel = ctx.accounts.admin_panel.as_mut();
    admin_panel.admin_wallet = params.admin_wallet;
    admin_panel.backend_wallet = params.backend_wallet;
    admin_panel.admin_panel_bump = *ctx.bumps.get("admin_panel").unwrap();
    admin_panel.payment_wallet = params.payment_wallet;
    admin_panel.fee_exploration = params.fee_exploration;
    admin_panel.fee_combat = params.fee_combat;
    admin_panel.fee_speed = params.fee_speed;
    admin_panel.total_paid_amount = 0u64;

    admin_panel.max_xp = params.max_xp;
    admin_panel.limit_items_allocated = params.limit_items_allocated;

    Ok(())
}
