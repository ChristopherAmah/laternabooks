import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route, useLocation } from 'react-router-dom' // Import useLocation
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Categories from './pages/Categories'
import Products from './pages/Shop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Topbar from './components/Topbar';
import CategoriesPage from "./pages/CategoriesPage";
import ProductDetails from './pages/ProductDetails';
import SearchResults from "./pages/SearchResults";
import SubCategories from "./components/SubCategory"; 
import CartPage from './components/CartPage';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
// import SubCategoryProducts from './components/SubCategoryProducts';

function App() {
  // 1. Get the current location object
  const location = useLocation();

  // 2. Define the path where the layout should be hidden
  // You can add more paths here if needed (e.g., '/register', '/forgot-password')
  const hideLayout = location.pathname === '/login'|| location.pathname === '/register';

  return (
    <main className='relative min-h-screen overflow-x-hidden'>
      <div>
        {/* 3. Conditionally render Topbar and Navbar */}
        {!hideLayout && <Topbar />}
        {!hideLayout && <Navbar />}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/categories/:id" element={<SubCategories />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productdetail" element={<ProductDetails />} />
          <Route path="/search" element={<SearchResults />} />
          {/* <Route path="/products/:subcategoryId" element={<SubCategoryProducts />} /> */}
        </Routes>

        {/* 4. Conditionally render Footer */}
        {!hideLayout && <Footer />}
      </div>
    </main>
  )
}

export default App