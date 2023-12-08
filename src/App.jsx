import { Router } from "@solidjs/router";
import { StoreProvider } from "./store";
import Main from "./pages/Main";

function App() {
  return (
    <Router base="/OnlineVagtplan">
      <StoreProvider>
        <Main />
      </StoreProvider>
    </Router>
  );
}

export default App;
