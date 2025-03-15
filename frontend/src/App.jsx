
import { Toaster } from "react-hot-toast";
import { UserProvider, useUser } from "./context/user.context";
import AppRoute from "./routes/App.route";

const App=()=>{
 
  return(
    <UserProvider>
      <Toaster/>
      <AppRoute/>
    </UserProvider>
  )
}

export default App;