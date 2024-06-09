//! nft launchpad program entrypoint

pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;
use instructions::*;

declare_id!("8ruAJmkjRC32HeWrHo7ng7kWmirHKiW7Djrafs5EgtVM");

#[program]
pub mod level_manager {
    // use state::ExtraMeta;

    use super::*;

    // admin_panel instructions
    pub fn initialize_admin_panel(ctx: Context<Initialize>, params: InitializeParams) -> Result<()> {
        instructions::initialize(ctx, &params)
    }
    pub fn update_admin_panel(ctx: Context<Update>, params: UpdateParams) -> Result<()> {
        instructions::update(ctx, &params)
    }

    // create player instruction
    pub fn create_player(ctx: Context<CreatePlayer>) -> Result<()> {
        instructions::create_player(ctx)
    }

    // update player instruction
    pub fn update_player(ctx: Context<UpdatePlayer>, params: UpdatePlayerParams) -> Result<()> {
        instructions::update_player(ctx, &params)
    }

    // create extra meta
    pub fn create_extra_meta(ctx: Context<CreateExtraMeta>) -> Result<()> {
        instructions::create_extra_meta(ctx)
    }

    // level up player
    pub fn level_up_player(ctx: Context<LevelUp>, params: LevelUpParams) -> Result<()> {
        instructions::level_up(ctx, &params)
    }

}
