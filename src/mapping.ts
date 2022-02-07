import { BigInt } from "@graphprotocol/graph-ts";
import { Breach, Transfer, landMinted, lordMinted } from "../generated/NFT/NFT";
import {
  tokenTransfer,
  tokenDetails,
  userBlacklist,
} from "../generated/schema";

export function handleBreach(event: Breach): void {
  let blackUser = userBlacklist.load(
    event.params.user.toString() + event.params.tokenId.toString()
  );
  if (!blackUser) {
    blackUser = new userBlacklist(event.params.user.toString());
    blackUser.attempts = 1;
    blackUser.userAddress = event.params.user;
  } else {
    blackUser.attempts = blackUser.attempts + 1;
  }
  blackUser.save();
}

export function handleTransfer(event: Transfer): void {
  const id = event.params.tokenId.toString();

  let transferEvent = new tokenTransfer(id);
  transferEvent.from = event.params.from;
  transferEvent.to = event.params.to;
  transferEvent.tokenId = event.params.tokenId;

  let nft = tokenDetails.load(id);
  if (!nft) {
    nft = new tokenDetails(id);
    nft.owner = event.params.to;
    nft.creatorAddress = event.params.to;
    nft.tokenId = event.params.tokenId;
    nft.transanctionHash = event.transaction.hash.toHexString();
    nft.createdOn = event.block.timestamp;
    nft.save();
  } else {
    nft.owner = event.params.to;
  }
  transferEvent.nftIdMap = id;
  transferEvent.save();
}

export function handlelandMinted(event: landMinted): void {
  let nft = tokenDetails.load(event.params.tokenId.toString());
  nft.type = "land";
  nft.save();
}

export function handlelordMinted(event: lordMinted): void {
  let nft = tokenDetails.load(event.params.tokenId.toString());
  nft.type = "lord";
  nft.save();
}
