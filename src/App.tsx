import { useState } from "react"
import "./assets/styles/App.css"

import BasketList from "./components/basket_list/BasketList.tsx"
import TotalAmount from "./components/total_amount/TotalAmount.tsx"
import { Item } from "./models/Item.ts"
import Products from "./data/Products.ts"

function App() {
  const [basket, setBasket] = useState<Item[]>(Products.getInitialBasket());

  return (
    <div className="App">
      <header>
        <h1>Vita Checkout Page</h1>
      </header>
      <main>
        <BasketList basket={basket} setBasket={setBasket} />
        <TotalAmount basket={basket} />
      </main>
    </div>
  )
}

export default App


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