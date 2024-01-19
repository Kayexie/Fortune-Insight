import {Main} from "./Main.js";
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<Main/>}/>
            </Routes>
        </BrowserRouter>
        {/*<Main/>*/}
    </div>
  )
}

export default App