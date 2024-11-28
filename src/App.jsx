import PublicRouter from "./routes/PublicRouter";
import { io } from "socket.io-client";
// export const socket = io("https://owner.bookmyfutsal.com");
export const socket = io("http://localhost:3000");
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function App() {
  return <PublicRouter />;
}

export default App;
