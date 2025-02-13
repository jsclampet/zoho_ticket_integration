import TicketModal from "./TicketModal";
import { useEffect } from "react";
import { getAccessToken } from "./utilities/tokens";

function App() {
  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <div>
      <TicketModal />
    </div>
  );
}

export default App;
