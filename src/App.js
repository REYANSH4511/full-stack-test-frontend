import "./App.css";
import PersonalDetails from "./components/personalDeatils";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddressDeatils from "./components/addressDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PersonalDetails />} />
        <Route path="/address-details" element={<AddressDeatils />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
