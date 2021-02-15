const { createHttpLink } = require('apollo-link-http')
const { InMemoryCache } = require('apollo-cache-inmemory') 
const {ApolloClient} = require('apollo-client')

const {
  CREATE_VIRTUAL_DEPOSIT_ACCOUNT,
  CURRENT_BUYCOINS_PRICE,
  DYNAMIC_PRICE_EXPIRY,
  PLACING_LIMIT_ORDER,
  PLACING_MARKET_ORDER,
  GET_ORDERS,
  GET_MARKET_BOOK,
  GET_SINGLE_CRYPTO_PRICE,
  GET_PRICES,
  BUY_CRYPTO,
  SELL_CRYPTO,
  GET_ESTIMATED_NETWORK_FEE,
  SEND_CRYPTO,
  GET_BALANCES,
  CREATE_ADDRESS,
} = require("./queries");

const setupBCoins = ({ publicKey, secretKey }) => {
  if (!(publicKey && secretKey))
    return "please provide your public and secret key";
  const authValue =
    "Basic " + Buffer.from(publicKey + ":" + secretKey).toString("base64");

  const client = new ApolloClient({
    link: createHttpLink({
      uri:  "https://backend.buycoins.tech/api/graphql",
      // fetch:  fetch,
      headers: {
        authorization: authValue,
      },
    }),
    cache: new InMemoryCache(),
  });
  
  const bcoins = {
    client,
    createVirtualDepositAccount: (request) => mutationWrapper(client, CREATE_VIRTUAL_DEPOSIT_ACCOUNT, request) ,
    getBuyCoinsPrices: (request) => queryWrapper(client, CURRENT_BUYCOINS_PRICE, request),
    getDynamicPriceExpiry: (request) => queryWrapper(client, DYNAMIC_PRICE_EXPIRY, request),
    placeLimitingOrder: (request) => mutationWrapper(client, PLACING_LIMIT_ORDER, request),
    placeMarketOrder: (request) => mutationWrapper(client, PLACING_MARKET_ORDER, request),
    getOrders: (request) => queryWrapper(client, GET_ORDERS, request),
    getMarketBook: (request) => queryWrapper(client, GET_MARKET_BOOK, request),
    getSingleCryptoPrice: (request) => queryWrapper(client, GET_SINGLE_CRYPTO_PRICE,request),
    getPrices: (request) => queryWrapper(client, GET_PRICES,request),
    buyCrypto: (request) => mutationWrapper(client, BUY_CRYPTO, request),
    sellCrypto: (request) => mutationWrapper(client, SELL_CRYPTO, request),
    getEstimatedNetworkFee: (request) => queryWrapper(client, GET_ESTIMATED_NETWORK_FEE, request),
    sendCrypto:  (request) => mutationWrapper(client, SEND_CRYPTO, request),
    getBalances:  (request) => queryWrapper(client, GET_BALANCES, request),
    createAddress:  (request) => mutationWrapper(client, CREATE_ADDRESS, request),
  };

  return bcoins;
};

const queryWrapper = (client, fn, request) => {
  return client
    .query({ query: fn(request) })
    .then(res => res)
    .catch(err => err);
};

const mutationWrapper = (client, fn, request) => {
  return client
    .mutate({ mutation: fn(), variables: request })
    .then(res => res)
    .catch(err => err);
};

module.exports = {
  setupBCoins
}