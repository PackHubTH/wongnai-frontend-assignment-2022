import { Route, Routes } from "react-router-dom";

import Restaurant from "@pages/Restaurant";

function App() {
  console.log(import.meta.env);
  return (
    <div className="flex flex-col">
      <Routes>
        <Route path="/" element={<Restaurant />} />
      </Routes>
      {/* <Banner />
      <h1>Edit this app to complete LINE MAN Wongnai Frontend Assignment!</h1> */}
    </div>
  );
}

export default App;
