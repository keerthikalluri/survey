import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import SurveyForm from './components/SurveyForm';
import {Routes, Route, BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SurveyForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  
);
