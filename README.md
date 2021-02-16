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

//second parameter is supposed to the browser fetch, by default it uses node-fetch
const bcoins = setupBCoins({
  publicKey: "pass_public_key",
  secretKey: "pass_secret_key",
}, fetch);

//call an endpoint
//bcoins returns several other methods see documentation down
bcoins
  .getDynamicPriceExpiry({ status: "open" })
  .then((res) => console.log(res));

```

## In React with @apollo/client

##In your root component
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
        <h2>My first Apollo app 🚀</h2>
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

Also Integates seamlesslly with Vue and Apollo Client

# Documentation





