//this file contains the graphql query structure for the different data needed to be fetched, but does not make the api call
const { gql } = require("apollo-boost");

//crate virtual deposit account
const CREATE_VIRTUAL_DEPOSIT_ACCOUNT = () => gql`
  mutation($accountName: String!) {
    createDepositAccount(accountName: $accountName) {
      accountNumber
      accountName
      accountType
      bankName
      accountReference
    }
  }
`;

//P2P trading
const CURRENT_BUYCOINS_PRICE = ({ side, mode, cryptocurrency }) => gql`
  query {
    buycoinsPrices(side: ${side}, mode: ${mode}, cryptocurrency: ${cryptocurrency}){
      buyPricePerCoin
      cryptocurrency
      id
      maxBuy
      maxSell
      minBuy
      minCoinAmount
      minSell
      mode
      sellPricePerCoin
      status
    }
  }
`;

const DYNAMIC_PRICE_EXPIRY = ({ status }) => gql`
  query {
    getOrders(status: ${status}) {
      dynamicPriceExpiry
    }
  }
`;

const PLACING_LIMIT_ORDER = () => gql`
  mutation(
    $orderSide: OrderSide!
    $coinAmount: BigDecimal!
    $cryptocurrency: Cryptocurrency!
    $staticPrice: BigDecimal
    $priceType: PriceType!
    $dynamicExchangeRate: BigDecimal
  ) {
    postLimitOrder(
      orderSide: $orderSide
      coinAmount: $coinAmount
      cryptocurrency: $cryptocurrency
      staticPrice: $staticPrice
      priceType: $priceType
      dynamicExchangeRate: $dynamicExchangeRate
    ) {
      id
      cryptocurrency
      coinAmount
      side
      status
      createdAt
      pricePerCoin
      priceType
      staticPrice
      dynamicExchangeRate
    }
  }
`;

const PLACING_MARKET_ORDER = () => gql`
  mutation(
    $orderSide: OrderSide!
    $coinAmount: BigDecimal!
    $cryptocurrency: Cryptocurrency!
  ) {
    postMarketOrder(
      orderSide: $orderSide
      coinAmount: $coinAmount
      cryptocurrency: $cryptocurrency
    ) {
      id
      cryptocurrency
      coinAmount
      side
      status
      createdAt
      pricePerCoin
      priceType
      staticPrice
      dynamicExchangeRate
    }
  }
`;

const GET_ORDERS = ({ status }) => gql`
query {
  getOrders(status: ${status}) {
    dynamicPriceExpiry
    orders {
      edges {
        node {
          id
          cryptocurrency
          coinAmount
          side
          status
          createdAt
          pricePerCoin
          priceType
          staticPrice
          dynamicExchangeRate
        }
      }
    }
  }
}
`;

const GET_MARKET_BOOK = () => gql`
  query {
    getMarketBook {
      dynamicPriceExpiry
      orders {
        edges {
          node {
            id
            cryptocurrency
            coinAmount
            side
            status
            createdAt
            pricePerCoin
            priceType
            staticPrice
            dynamicExchangeRate
          }
        }
      }
    }
  }
`;

//placing orders
const GET_PRICES = () => gql`
  query {
    getPrices {
      id
      cryptocurrency
      buyPricePerCoin
      minBuy
      maxBuy
      expiresAt
    }
  }
`;

const GET_SINGLE_CRYPTO_PRICE = ({cryptocurrency}) => gql`
  query {
    getPrices(cryptocurrency: ${cryptocurrency}) {
      id
      cryptocurrency
      buyPricePerCoin
      minBuy
      maxBuy
      expiresAt
    }
  }
`;

const BUY_CRYPTO = () => gql`
mutation(
  $priceId: ID!
  $coin_amount: BigDecimal!
  $cryptocurrency: Cryptocurrency!
){
    buy(price: $priceId, coin_amount: $coin_amount, cryptocurrency: $cryptocurrency){
      id
      cryptocurrency
      status
      totalCoinAmount
      side
    }
  }
`;

const SELL_CRYPTO = () => gql`
mutation(
  $priceId: ID!
  $coin_amount: BigDecimal!
  $cryptocurrency: Cryptocurrency!
){
    sell(price: $priceId, coin_amount: $coin_amount, cryptocurrency: $cryptocurrency){
      id
      cryptocurrency
      status
      totalCoinAmount
      side
    }
  }
`;

//sending crypto
const GET_ESTIMATED_NETWORK_FEE = ({ cryptocurrency, amount }) => gql`
  query {
    getEstimatedNetworkFee(cryptocurrency: ${cryptocurrency}, amount: ${amount}) {
      estimatedFee
      total
    }
  } 
`;

const SEND_CRYPTO = () => gql`
  mutation(
    $amount: BigDecimal!
    $cryptocurrency: Cryptocurrency!
    $address: String!
  ) {
    send(cryptocurrency: $cryptocurrency, amount: $amount, address: $address) {
      id
      address
      amount
      cryptocurrency
      fee
      status
      transaction {
        hash
        id
      }
    }
  }
`;

const GET_BALANCES = () => gql`
  query {
    getBalances {
      id
      cryptocurrency
      confirmedBalance
    }
  }
`;

//receiving crypto
const CREATE_ADDRESS = () => gql`
  mutation($cryptocurrency: Cryptocurrency!) {
    createAddress(cryptocurrency: $cryptocurrency) {
      cryptocurrency
      address
    }
  }
`;

module.exports = {
  CREATE_VIRTUAL_DEPOSIT_ACCOUNT,
  CURRENT_BUYCOINS_PRICE,
  DYNAMIC_PRICE_EXPIRY,
  PLACING_LIMIT_ORDER,
  PLACING_MARKET_ORDER,
  GET_ORDERS,
  GET_MARKET_BOOK,
  GET_PRICES,
  BUY_CRYPTO,
  SELL_CRYPTO,
  GET_ESTIMATED_NETWORK_FEE,
  SEND_CRYPTO,
  GET_BALANCES,
  CREATE_ADDRESS,
  GET_SINGLE_CRYPTO_PRICE
};
