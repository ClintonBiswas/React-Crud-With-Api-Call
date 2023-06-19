import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/pages/Home';
import View from './Components/pages/View';
import Edit from './Components/pages/Edit';
function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/view/:id' element={<View />} />
        <Route exact path='/edit/:id' element={<Edit />} />
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
