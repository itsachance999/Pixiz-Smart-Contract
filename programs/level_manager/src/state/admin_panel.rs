use anchor_lang::prelude::*;

#[account]
#[derive(Default, Debug)]
pub struct AdminPanel {
    pub admin_wallet: Pubkey,
    pub backend_wallet: Pubkey,
    pub admin_panel_bump: u8,
    pub payment_wallet: Pubkey,
    pub fee_exploration: u64,
    pub fee_combat: u64,
    pub fee_speed: u64,
    pub total_paid_amount: u64,

    pub max_xp: u64,
    pub limit_items_allocated: u64,

}

impl anchor_lang::Id for AdminPanel {
    fn id() -> Pubkey {
        crate::ID
    }
}

impl AdminPanel {
    pub const LEN: usize = 8 + std::mem::size_of::<AdminPanel>();
}
