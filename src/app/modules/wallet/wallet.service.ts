import { JwtPayload } from "jsonwebtoken";
import { IWallet } from "./wallet.interface";

// {
//   _id?: string;
//   userId: Types.ObjectId;
//   accountNo: number;
//   balance: number;
//   currency: CurrencyType;
//   walletType: WalletType;
//   walletStatus: WalletStatus;
//   blockedReason?: string;
//   isNIDVerified: boolean;
// }

const verifyWallet = (payload: Partial<IWallet>, varifiedToken: JwtPayload) => {
  //
};
const changeCurrency = () => {
  //
};
const beAgent = () => {
  //
};

export const WalletServices = {
  verifyWallet,
  changeCurrency,
  beAgent,
};
