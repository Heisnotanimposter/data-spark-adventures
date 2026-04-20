exports.calculatePrice = (supply, k, basePrice) => {
  return basePrice + k * Math.pow(supply, 2);
};

exports.getCostToMint = (currentSupply, amountToMint, k, basePrice) => {
  let totalCost = 0;
  for (let i = 0; i < amountToMint; i++) {
    totalCost += exports.calculatePrice(currentSupply + i, k, basePrice);
  }
  return totalCost;
};

exports.getRefundOnBurn = (currentSupply, amountToBurn, k, basePrice) => {
  let totalRefund = 0;
  for (let i = 0; i < amountToBurn; i++) {
    totalRefund += exports.calculatePrice(currentSupply - i - 1, k, basePrice);
  }
  return totalRefund;
};
