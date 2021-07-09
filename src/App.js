import React from "react";
import './App.css';
import CustomSlider from "./components/CustomSlider";


function App() {
  return (
      <div className="App">
          <CustomSlider slidesToShow={4} />
      </div>

  );
}

export default App;
