const changeCurrency = () => {
  //
};

const beAgent = () => {
  //
};

const checkBalance = async (payload: { id: string; password: string }) => {
  console.log(payload);
  return payload;
};

export const WalletServices = {
  // verifyWallet,
  changeCurrency,
  beAgent,
  checkBalance,
};
