import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Categories from './pages/Categories'
import Products from './pages/Shop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Topbar from './components/Topbar';
import CategoriesPage from "./pages/CategoriesPage";
import ProductDetails from './pages/ProductDetails';
import SearchResults from "./pages/SearchResults";
import SubCategories from "./components/SubCategory"; 

function App() {
  return (
    <main className='relative min-h-screen overflow-x-hidden'>
      <div>
        <Topbar />
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/category" element={<Categories />} />
            <Route path="/shop/:id" element={<SubCategories />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productdetail" element={<ProductDetails />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        <Footer />
      </div>
    </main>
  )
}

export default App
