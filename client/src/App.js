import {Main} from "./Main.js";
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CheckoutPage from "./Checkout/CheckoutPage";

const App = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<Main/>}/>

                <Route path='/checkout' element={<CheckoutPage/>}></Route>
            </Routes>
        </BrowserRouter>
        {/*<Main/>*/}
    </div>
  )
}

export default App