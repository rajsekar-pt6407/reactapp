import { Registers } from "./Register";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Homepage } from "./HomePage";
import { Login } from "./Login";
import { DashBoard } from "./DashBoard";
import { Fetchnews } from "./FetchNews";

export const App=()=>{
  return(
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/"     element={<Homepage/>}/>
            <Route path="/register" element={<Registers/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<DashBoard/>}/> 
            <Route path="/news" element={<Fetchnews/>}/>
          </Routes>    
      </BrowserRouter> 
    </div>
  )
};

export default App;
