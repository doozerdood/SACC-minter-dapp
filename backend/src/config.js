require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "SlowAlienCarClub";
const description = "Members of the GALACTIC ELITE, who hold all the keys to luxury in the galaxy. Owning a SACC NFT gives exclusive access to benefits with Quartermile Exotics, a premier luxury/exotic car rental service, such as: Discounts on rentals, event access, free rentals for cruising events, and MUCH more! In short... wen lambo?... How about RIGHT NOW!";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 1500,
    layersOrder: [
      { name: "Background" },
      { name: "Skin" },
      { name: "Clothes" },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Face Accessory" },
      { name: "Glasses" },
      { name: "Head Gear" },
      { name: "Raygun" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 1024,
  height: 1024,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://quartermileexotics.com/sacc", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 6; // Your API key rate limit
const CHAIN = 'polygon'; // only rinkeby or polygon

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'SlowAlienCarClub';
const CONTRACT_SYMBOL = 'SACC';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0x91b148ba73368449EE28e55A3857bD730fcE9bc3';
const TREASURY_ADDRESS = '0x91b148ba73368449EE28e55A3857bD730fcE9bc3';
const MAX_SUPPLY = 1500; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 800; // Minting price per NFT. Rinkeby = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-04-30T11:00:48+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-03-20T11:30:48+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 1000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0x91b148ba73368449EE28e55A3857bD730fcE9bc3"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = ["0xb3368a88572971766fc2a6658514b6c4A1168d38", "0x501DF451487C9F2D387bFc416567b133d9F1fc00", "0xe6bBEBdF6caD73F6A5C0226D80Ac107a3Bd7f63f", "0x91b148ba73368449EE28e55A3857bD730fcE9bc3", "0xE421A5Eb53a2E2CCE2563c66bF8175e24c4b655F", "0x224DcaE3AEc320Ee4b87e51489E74DE731E0Cc52", "0x465a375e4A02AC4979346C736c168feA5eFB32e7", "0x9fdB6980E83a83dCb79366cC3b2fec6fc9fc6Be2", "0xD6E20824a1FdF8733d75155664985c65113ef788", "0x9d5c10017736F41F7b28727E6436237da8f2adDA", "0x039e38907bd2fe0308Cc21436D9c6a41f4cd01f5","0x81e9A57E4853bB8F8e099AB851334fcBeCE562Ec", "0x5ac49b856A12daa4f7EF0221416562dCA1254163", "0x918B164187b62Aa29Fb8021075cd4aeEC7d22AA3", "0xCCD004Be9583D79Abf207189DeFd6304d87d5f18", "0xCE5302E6280ab958aCB654e1A2C3BA680efC056b", "0xAba71725CC909c7455Ce378dB6e8d50ACA5f8343", "0x36209c59D8106C59Cf9980979F519D7d5d6Db04F", "0x5F03AddCBdEbD1DCF3fa5d768fC06349a3ccf887", "0xd71e461c827381adB57F0619d92c10287b98A2bB", "0xa1d92864D63cFB0904475088c58C493e42abcF21", "0xea7759a22d6c84eA1644d03d8F906f77F9A23709", "0x869EbE9476d59725f1a9756AfffbF1B944cD65F3", "0x56b1b1Ad8d14FC4cA69735fc15FFb04BE8c21775", "0xF24cA22E5B8150045e155A42A539AFAb627aC7ca", "0x2168Fd61036DC5CB110Fa84Edb9A13Ba2028d47E", "0x9bB9aAE024e80abEd85f2648c5F3bA44AC2F23b9", "0x1fe702E634214043bb73F8f804c3e783448FFC75", "0x46e286E0035324Ae90F2A74023D17bA1064D60f8", "0x1Fc7116a9D7F1d76d88da9456f3015b4a20d1A79", "0xadc0DE7096fE649D1d3306Fd841207FECDF208e9"];

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "The earth beacon is awaiting identification of your alien!"; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafybeibxpucanlqgq6t3vc3gjey4afveo2n2xcg2sdpvnuwlgubaj3yohq"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK" && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "SACC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://quartermileexotics.com/sacc",
  creators: [
    {
      address: "79dWvnsFMSVj9uubbW8mvQi6jg1RgGDqrcuMjdfyyB8R",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
