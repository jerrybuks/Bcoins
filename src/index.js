const { setupBCoins } = require("./setup")
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

module.exports = {
    setupBCoins,
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
    CREATE_ADDRESS
}
