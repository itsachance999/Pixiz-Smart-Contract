export type LevelManager = {
  "version": "0.1.0",
  "name": "level_manager",
  "instructions": [
    {
      "name": "initializeAdminPanel",
      "accounts": [
        {
          "name": "adminWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminPanel",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitializeParams"
          }
        }
      ]
    },
    {
      "name": "updateAdminPanel",
      "accounts": [
        {
          "name": "adminWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminPanel",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "UpdateParams"
          }
        }
      ]
    },
    {
      "name": "createPlayer",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updatePlayer",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminPanel",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "UpdatePlayerParams"
          }
        }
      ]
    },
    {
      "name": "createExtraMeta",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "nft mint address."
          ]
        },
        {
          "name": "extraMeta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "levelUpPlayer",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminPanel",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "paymentWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "nft mint address."
          ]
        },
        {
          "name": "nftTokenAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "user's token account address."
          ]
        },
        {
          "name": "extraMeta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The [System] program."
          ]
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "LevelUpParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "adminPanel",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adminWallet",
            "type": "publicKey"
          },
          {
            "name": "backendWallet",
            "type": "publicKey"
          },
          {
            "name": "adminPanelBump",
            "type": "u8"
          },
          {
            "name": "paymentWallet",
            "type": "publicKey"
          },
          {
            "name": "feeExploration",
            "type": "u64"
          },
          {
            "name": "feeCombat",
            "type": "u64"
          },
          {
            "name": "feeSpeed",
            "type": "u64"
          },
          {
            "name": "totalPaidAmount",
            "type": "u64"
          },
          {
            "name": "maxXp",
            "type": "u64"
          },
          {
            "name": "limitItemsAllocated",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "extraMeta",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nftMint",
            "type": "publicKey"
          },
          {
            "name": "extraMetaBump",
            "type": "u8"
          },
          {
            "name": "level",
            "type": "u64"
          },
          {
            "name": "exp",
            "type": "u64"
          },
          {
            "name": "combat",
            "type": "u64"
          },
          {
            "name": "speed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "player",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "playerBump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "xp",
            "type": "u64"
          },
          {
            "name": "paidAmount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitializeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adminWallet",
            "type": "publicKey"
          },
          {
            "name": "backendWallet",
            "type": "publicKey"
          },
          {
            "name": "paymentWallet",
            "type": "publicKey"
          },
          {
            "name": "feeExploration",
            "type": "u64"
          },
          {
            "name": "feeCombat",
            "type": "u64"
          },
          {
            "name": "feeSpeed",
            "type": "u64"
          },
          {
            "name": "maxXp",
            "type": "u64"
          },
          {
            "name": "limitItemsAllocated",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UpdateParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adminWallet",
            "type": "publicKey"
          },
          {
            "name": "backendWallet",
            "type": "publicKey"
          },
          {
            "name": "paymentWallet",
            "type": "publicKey"
          },
          {
            "name": "feeCreatePlayer",
            "type": "u64"
          },
          {
            "name": "feeExploration",
            "type": "u64"
          },
          {
            "name": "feeCombat",
            "type": "u64"
          },
          {
            "name": "feeSpeed",
            "type": "u64"
          },
          {
            "name": "maxXp",
            "type": "u64"
          },
          {
            "name": "limitItemsAllocated",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "LevelUpParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "exploration",
            "type": "u64"
          },
          {
            "name": "combat",
            "type": "u64"
          },
          {
            "name": "speed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UpdatePlayerParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "xp",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "MathOverflow",
      "msg": "Overflow in arithmetic operation"
    },
    {
      "code": 6001,
      "name": "InvalidAuthority",
      "msg": "Authority is invalid"
    },
    {
      "code": 6002,
      "name": "InvalidTokenStandard",
      "msg": "TokenStandard is invalid"
    },
    {
      "code": 6003,
      "name": "InvalidLaunchTime",
      "msg": "Launch time is invalid"
    },
    {
      "code": 6004,
      "name": "InvalidFeeWallet",
      "msg": "Fee wallet is invalid"
    },
    {
      "code": 6005,
      "name": "InvalidNftMintAddress",
      "msg": "InvalidNftMintAddress"
    },
    {
      "code": 6006,
      "name": "InvalidNftOwner",
      "msg": "InvalidNftOwner"
    },
    {
      "code": 6007,
      "name": "InvalidNftAmount",
      "msg": "InvalidNftAmount"
    },
    {
      "code": 6008,
      "name": "LimitItemsOverflow",
      "msg": "LimitItemsOverflow"
    },
    {
      "code": 6009,
      "name": "XpNotEnough",
      "msg": "XpNotEnough"
    }
  ]
};

export const IDL: LevelManager = {
  "version": "0.1.0",
  "name": "level_manager",
  "instructions": [
    {
      "name": "initializeAdminPanel",
      "accounts": [
        {
          "name": "adminWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminPanel",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitializeParams"
          }
        }
      ]
    },
    {
      "name": "updateAdminPanel",
      "accounts": [
        {
          "name": "adminWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminPanel",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "UpdateParams"
          }
        }
      ]
    },
    {
      "name": "createPlayer",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updatePlayer",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminPanel",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "UpdatePlayerParams"
          }
        }
      ]
    },
    {
      "name": "createExtraMeta",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "nft mint address."
          ]
        },
        {
          "name": "extraMeta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "levelUpPlayer",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminPanel",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "paymentWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "nft mint address."
          ]
        },
        {
          "name": "nftTokenAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "user's token account address."
          ]
        },
        {
          "name": "extraMeta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The [System] program."
          ]
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "LevelUpParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "adminPanel",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adminWallet",
            "type": "publicKey"
          },
          {
            "name": "backendWallet",
            "type": "publicKey"
          },
          {
            "name": "adminPanelBump",
            "type": "u8"
          },
          {
            "name": "paymentWallet",
            "type": "publicKey"
          },
          {
            "name": "feeExploration",
            "type": "u64"
          },
          {
            "name": "feeCombat",
            "type": "u64"
          },
          {
            "name": "feeSpeed",
            "type": "u64"
          },
          {
            "name": "totalPaidAmount",
            "type": "u64"
          },
          {
            "name": "maxXp",
            "type": "u64"
          },
          {
            "name": "limitItemsAllocated",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "extraMeta",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nftMint",
            "type": "publicKey"
          },
          {
            "name": "extraMetaBump",
            "type": "u8"
          },
          {
            "name": "level",
            "type": "u64"
          },
          {
            "name": "exp",
            "type": "u64"
          },
          {
            "name": "combat",
            "type": "u64"
          },
          {
            "name": "speed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "player",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "playerBump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "xp",
            "type": "u64"
          },
          {
            "name": "paidAmount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitializeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adminWallet",
            "type": "publicKey"
          },
          {
            "name": "backendWallet",
            "type": "publicKey"
          },
          {
            "name": "paymentWallet",
            "type": "publicKey"
          },
          {
            "name": "feeExploration",
            "type": "u64"
          },
          {
            "name": "feeCombat",
            "type": "u64"
          },
          {
            "name": "feeSpeed",
            "type": "u64"
          },
          {
            "name": "maxXp",
            "type": "u64"
          },
          {
            "name": "limitItemsAllocated",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UpdateParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adminWallet",
            "type": "publicKey"
          },
          {
            "name": "backendWallet",
            "type": "publicKey"
          },
          {
            "name": "paymentWallet",
            "type": "publicKey"
          },
          {
            "name": "feeCreatePlayer",
            "type": "u64"
          },
          {
            "name": "feeExploration",
            "type": "u64"
          },
          {
            "name": "feeCombat",
            "type": "u64"
          },
          {
            "name": "feeSpeed",
            "type": "u64"
          },
          {
            "name": "maxXp",
            "type": "u64"
          },
          {
            "name": "limitItemsAllocated",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "LevelUpParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "exploration",
            "type": "u64"
          },
          {
            "name": "combat",
            "type": "u64"
          },
          {
            "name": "speed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UpdatePlayerParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "xp",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "MathOverflow",
      "msg": "Overflow in arithmetic operation"
    },
    {
      "code": 6001,
      "name": "InvalidAuthority",
      "msg": "Authority is invalid"
    },
    {
      "code": 6002,
      "name": "InvalidTokenStandard",
      "msg": "TokenStandard is invalid"
    },
    {
      "code": 6003,
      "name": "InvalidLaunchTime",
      "msg": "Launch time is invalid"
    },
    {
      "code": 6004,
      "name": "InvalidFeeWallet",
      "msg": "Fee wallet is invalid"
    },
    {
      "code": 6005,
      "name": "InvalidNftMintAddress",
      "msg": "InvalidNftMintAddress"
    },
    {
      "code": 6006,
      "name": "InvalidNftOwner",
      "msg": "InvalidNftOwner"
    },
    {
      "code": 6007,
      "name": "InvalidNftAmount",
      "msg": "InvalidNftAmount"
    },
    {
      "code": 6008,
      "name": "LimitItemsOverflow",
      "msg": "LimitItemsOverflow"
    },
    {
      "code": 6009,
      "name": "XpNotEnough",
      "msg": "XpNotEnough"
    }
  ]
};
