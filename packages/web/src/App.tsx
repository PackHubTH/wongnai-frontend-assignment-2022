import { Route, Routes } from "react-router-dom";

import Restaurant from "@pages/Restaurant";

function App() {
  return (
    <div className="flex flex-col">
      <Routes>
        <Route path="/" element={<Restaurant />} />
      </Routes>
    </div>
  );
}

export default App;
