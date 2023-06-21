import Forms from './Forms';
import LayoutEl from './layout';
import Test1 from './Test1';
import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <Routes>
      <Route index element={<LayoutEl />} />
      <Route path="Forms" element={<Forms />} />
      <Route path="Test1" element={<Test1 />} />
    </Routes>
  );
}

export default App;
