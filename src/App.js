import { GlobalProvider } from "./context/GlobalContext";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import TablePage from "./pages/TablePage";
import UpdatePage from "./pages/UpdatePage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (

    <>
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/table" element={<TablePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/update/:id" element={<UpdatePage />} />
            <Route path="/product/:id" element={<DetailPage />} />
          </Routes>
        </GlobalProvider>
      </BrowserRouter>

    </>
    )
}

export default App;
