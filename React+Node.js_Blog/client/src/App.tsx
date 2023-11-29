import Blogmain from "./Component/Bloglist";
import { Outlet } from "react-router-dom";


function App() {

  return (<>
    {/* <Blogmain /> */}
    <Outlet />
  </>);
}

export default App;
