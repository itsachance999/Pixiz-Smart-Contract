## Pixiz Smart Contract

# Background

PixizSmartContract encompasses serverless functions and smart contracts for rendering generative NFTs. The API defines a standard way to point to indicate pointers to any on-chain data that will be dynamically read and returned into the metadata of the NFT. In addition, there is an implementation of an on-chain mapping that fits this API spec to allow for more complex updating of this mapping. Generator works well with standard NFT collections and fits within the Metaplex NFT standard. It also composes with other programs in the NFT infrastructure ecosystem.

# Addresses

Program addresses are the same on devnet. NOT deploy on testnet and mainnet-beta.

- Generator: 8ruAJmkjRC32HeWrHo7ng7kWmirHKiW7Djrafs5EgtVM

# Documentation

Generator is mainly an API that is designed to fit within the metaplex NFT standard, but bring the composability of on-chain data directly into the NFTs. This allows for more complex NFT use cases to compose directly with the attributes of the NFT while still maintaining compatibility with all wallet and marketplaces. Because this generator is dynamic, it means any time you view or load the NFT it will pull fresh on-chain data. Being serverless also means there is no dependency on infrastructure and scales horizontally. The long term vision of this project is to either adopt these practices within apps directly so they do not need to rely on the API, or run the API on a decentralized computing platform. For the time being, it serves to fit dynamic NFTs into the existing Solana NFT rails.

# Dynamic Attributes

AdminPanel 
- Admin has control of user's xp deposit and payment wallet. Payment wallet is kind of account that receive benefit from game. 
- Admin also has control of fee to every new extra metadata's increasement. 

Extra Metadata 
- Extra metadata can be created by anyone including admin and player. 
- It has all new attribute that will be added to nft's metadata attribute.

# Workflow

- Admin has to initialize information for control.
- Player or Admin can create new extra metadata for nft.
- When player's xp reaches to limit, he sends level up request to our server.
- Our server checks player's xp and then deposit it to on-chain. After that, return success.
- If player receive success, player sends level up request to smart contract.
- Extra Metadata has changed! Player can enjoy it.