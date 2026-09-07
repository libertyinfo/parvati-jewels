import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Productlist from "./components/Productlist";
import Productdetails from "./components/Productdetails";
import Contact from "./components/Contact";
import InquiryModal from "./components/InquiryModal";

function App() {
  const [inquiryState, setInquiryState] = useState({ isOpen: false, type: null });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Header setInquiryState={setInquiryState} /><Home /><Footer /></>} />
          <Route path="/productlist" element={<><Header setInquiryState={setInquiryState} /><Productlist /><Footer /></>} />
          <Route path="/productdetails" element={<><Header setInquiryState={setInquiryState} /><Productdetails setInquiryState={setInquiryState} /><Footer /></>} />
          <Route path="/contact" element={<><Header setInquiryState={setInquiryState} /><Contact /><Footer /></>} />
        </Routes>
      </BrowserRouter>
      <InquiryModal inquiryState={inquiryState} setInquiryState={setInquiryState} />
    </>
  )
}

export default App
