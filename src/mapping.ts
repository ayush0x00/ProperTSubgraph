import { BigInt } from "@graphprotocol/graph-ts";
import { Breach, Transfer, landMinted, lordMinted } from "../generated/NFT/NFT";
import {
  tokenTransfer,
  tokenDetails,
  userBlacklist,
} from "../generated/schema";

export function handleBreach(event: Breach): void {}

export function handleTransfer(event: Transfer): void {}

export function handlelandMinted(event: landMinted): void {}

export function handlelordMinted(event: lordMinted): void {}
