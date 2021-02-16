# Bcoins

communicate with BuyCoins Graphql api easily. Integrates easily with vanilla js and other Frameworks like React, Vue e.t.c.

# Features

- low-fat wrapper for BuyCoins graphql api
- integrates easily into vanilla js and other Frameworks like React, Vue e.t.c. 
- Although client side, also supports integration with server side
- simple and staight forward with minimal dependencies

# Installing

`npm i bcoins --save` or `yarn add bcoins`

- Depends on `graphql apollo-boost and node-fetch (for easy testing without having to run the browser)`.
- Targets ES5.
- Built with ES6.
- Supported in Node and the browser(s) and React Native.

# Quick Start

## With Vanilla Js
```js
const { setupBCoins } = require("bcoins");

//second parameter is supposed to be the browser fetch, by default it uses node-fetch
const bcoins = setupBCoins({
  publicKey: "pass_public_key",
  secretKey: "pass_secret_key",
}, fetch);

//call an endpoint
//bcoins returns several other methods, see documentation below
bcoins
  .getDynamicPriceExpiry({ status: "open" })
  .then((res) => console.log(res));

```

## In React with @apollo/client

### In your root component
```js
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { setupBCoins } from 'bcoins';

const bcoins = setupBCoins({
  publicKey: "pass_public_key",
  secretKey: "pass_secret_key",
}, fetch);

function App() {
  return (
    <ApolloProvider client={bcoins.client}>
      <div>
        <h2>My first BuyCoins Apollo app 🚀</h2>
      </div>
    </ApolloProvider>
  );
}
```

### In component where you want query data
```js
import { useQuery } from '@apollo/client';
import { GET_ESTIMATED_NETWORK_FEE } from "bcoins";

function BuyCoinsPrice() {
  const { loading, error, data } = useQuery(GET_ESTIMATED_NETWORK_FEE({amount: "0.1", cryptocurrency : "bitcoin"}) );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <p>
        price: {data?.getEstimatedNetworkFee?.estimatedFee:}
      </p>
    </div>
  );
}
### 
```

### In component where you want make a mutuation data
```js
import { PLACING_MARKET_ORDER } from "bcoins";

function AddTodo() {
  let input;
  const [placeMarketOrder, { data }] = useMutation(PLACING_MARKET_ORDER());

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          placeMarketOrder({ variables: { orderSide : "", coinAmount: input.value, cryptocurrency : "litecoin"  } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Place Market Order</button>
      </form>
    </div>
  );
}
### 
```

Also Integates seamlessly with Vue and Apollo Client

# Documentation

You can check out the official BuyCoins Documentation on their [website](https://developers.buycoins.africa/) for more detailed explanations of how each query/mutuation works. This library implements all the possible queries and mutuations in the BuyCoins docs except the webhook section.

In order to support both usage in vanilla js and easy integration with Apollo client and other Js frameworks, the library export a setupBCoins function, which is used for the initial authorization setup and in addition exports all the methods which calls the different graphql queries and mutuations api calls

```js
const { setupBCoins } = require("bcoins");

//second parameter is supposed to the browser fetch, by default it uses node-fetch
const bcoins = setupBCoins({
  publicKey: "pass_public_key",
  secretKey: "pass_secret_key",
}, fetch);

//bcoins returns several other methods
// bcoins = {
//   client,
//   createVirtualDepositAccount: (request) => mutationWrapper(client, CREATE_VIRTUAL_DEPOSIT_ACCOUNT, request) ,
//   getBuyCoinsPrices: (request) => queryWrapper(client, CURRENT_BUYCOINS_PRICE, request),
//   getDynamicPriceExpiry: (request) => queryWrapper(client, DYNAMIC_PRICE_EXPIRY, request),
//   placeLimitingOrder: (request) => mutationWrapper(client, PLACING_LIMIT_ORDER, request),
//   placeMarketOrder: (request) => mutationWrapper(client, PLACING_MARKET_ORDER, request),
//   getOrders: (request) => queryWrapper(client, GET_ORDERS, request),
//   getMarketBook: (request) => queryWrapper(client, GET_MARKET_BOOK, request),
//   getSingleCryptoPrice: (request) => queryWrapper(client, GET_SINGLE_CRYPTO_PRICE,request),
//   getPrices: (request) => queryWrapper(client, GET_PRICES,request),
//   buyCrypto: (request) => mutationWrapper(client, BUY_CRYPTO, request),
//   sellCrypto: (request) => mutationWrapper(client, SELL_CRYPTO, request),
//   getEstimatedNetworkFee: (request) => queryWrapper(client, GET_ESTIMATED_NETWORK_FEE, request),
//   sendCrypto:  (request) => mutationWrapper(client, SEND_CRYPTO, request),
//   getBalances:  (request) => queryWrapper(client, GET_BALANCES, request),
//   createAddress:  (request) => mutationWrapper(client, CREATE_ADDRESS, request),
// };
```

the client object returned from creating an Apolloclient instance (whcich contains our uri and authorization header is also returned from the setup client function and can be accessed thus:

```js
bcoins.client
```

## Calling The API 

```js
//pass in objects with the field specied in each call as keys and with the appropriate values (please refer to the official docs)

//crate virtual deposit account
bcoins.createVirtualDepositAccount({ accountName });

//P2P trading
bcoins.getBuyCoinsPrices({ side, mode, cryptocurrency })
bcoins.getDynamicPriceExpiry({ status })
bcoins.placeLimitingOrder({ orderSide, coinAmount, cryptocurrency, staticPrice, priceType, dynamicExchangeRate  })
bcoins.placeMarketOrder({ orderSide, coinAmount, cryptocurrency })
bcoins.getOrders({ status })
bcoins.getMarketBook()

//placing orders
bcoins.getSingleCryptoPrice({ cryptocurrency })
bcoins.getPrices()
bcoins.buyCrypto({ priceId, coin_amount, cryptocurrency })
bcoins.sellCrypto({ priceId, coin_amount, cryptocurrency })

//sending crypto
bcoins.getEstimatedNetworkFee({ cryptocurrency, amount })
bcoins.sendCrypto({ amount, cryptocurrency, address })
bcoins.getBalances()


//receiving crypto
bcoins.createAddress({ cryptocurrency })
```

However if you are using React (or any other js framework) and Apollo CLient and which to let Apollo client handle all the data queries and mutuations, you can follow the setup pattern as shown in the React with @apollo/client above. This is made possible cause the library exports each individual graphql queries and mutuations as a function which can be called with arguments as shown in the React with @apollo/client section. 

```js
import {
  CREATE_VIRTUAL_DEPOSIT_ACCOUNT, // - mutation -
  CURRENT_BUYCOINS_PRICE,         // - query -
  DYNAMIC_PRICE_EXPIRY,           // - query -
  PLACING_LIMIT_ORDER,            // - mutation -
  PLACING_MARKET_ORDER,           // - mutation -
  GET_ORDERS,                     // - query -
  GET_MARKET_BOOK,                // - query -
  GET_SINGLE_CRYPTO_PRICE,        // - query -
  GET_PRICES,                     // - query -
  BUY_CRYPTO,                     // - mutation -
  SELL_CRYPTO,                    // - mutation -
  GET_ESTIMATED_NETWORK_FEE,      // - query -
  SEND_CRYPTO,                    // - mutation -
  GET_BALANCES,                   // - query -
  CREATE_ADDRESS,                 // - mutation -
}  from 'bcoins';
```

for the queries call them with the needed arguments and pass result to the useQuery hooks from Apollo client as shown in the React - Apollo section above, while for the mutuations just call them without any arguments and pass the result into the useMutation hook, then the resulting function (the first argument returned from the useMutation hook) will now be used to pass in a variables object. (also refer to the React - Apollo section to see an example.

# Contributing

Bugs? Comments? Features? PRs and Issues happily welcomed! 

# Moving Forward

- migration to typescript  

- implementation of tests





