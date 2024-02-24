import { useState } from "react";
import "./assets/styles/App.css";

import BasketList from "./components/basket_list/BasketList";
import TotalAmount from "./components/total_amount/TotalAmount";
import { Item } from "./models/Item";
import Products from "./data/Products";

function App() {
  const [basket, setBasket] = useState<Item[]>(Products.getInitialBasket());
  const totalItems = basket.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      <header>
        <h1>Checkout</h1>
        <p>Cart ({totalItems} items)</p> 
      </header>
      <main className="checkout-layout">
        <div className="basket-container"> 
          <BasketList basket={basket} setBasket={setBasket} />
        </div>
        <div className="order-summary"> 
          <TotalAmount basket={basket} />
        </div>
      </main>
    </div>
  );
}

export default App;


// useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://raw.githubusercontent.com/larsthorup/checkout-data/main/product.json"
  //       )
  //       const data = await response.json()
  //       setItems(data) //top-level "items" key containing an array of items
  //       console.log(data)
  //     } catch (error) {
  //       console.error("Error fetching data:", error)
  //     }
  //   }

  //   fetchData()
  // }, [])