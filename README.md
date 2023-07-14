# SandPool

This is an open-source project that aims to develop a decentralized NFT marketplace using smart contracts and a user-friendly frontend. The marketplace allows users to mint, buy, and sell non-fungible tokens (NFTs) without the need for a central authority or intermediary. It also incorporates an [AI model](https://github.com/3bodymo/SandPool-Admin-Panel) for detecting and classifying NSFW NFTs to ensure a safe and appropriate environment for all users.

<p align="center">
<img src="https://github.com/3bodymo/SandPool/blob/main/src/assets/images/SandPool-3.png" width="250px"/>
</p>

## Setup

```shell
git clone https://github.com/3bodymo/SandPool.git
cd SandPool
yarn install
yarn global add ganache-cli
```

## Getting Started

Before getting started, don't forget to add your `.env` file to the root directory with the following details:
```shell
REACT_APP_INFURIA_PID=<INFURIA_API_KEY_HERE>
REACT_APP_INFURIA_API=<INFURIA_API_KEY_SECRET_HERE>
```

Now, you are ready to run:
```shell
ganache-cli
truffle migrate --reset
yarn start
```

Visit this URL in your browser: http://localhost:3000
