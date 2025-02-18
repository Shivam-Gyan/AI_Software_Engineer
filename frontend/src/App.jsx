import { UserProvider } from "./context/user.context";
import AppRoute from "./routes/App.route";

const App=()=>{

  return(
    <UserProvider>
      <AppRoute/>
    </UserProvider>
  )
}

export default App;