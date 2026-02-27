import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route, useLocation } from 'react-router-dom'
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
import WishlistPage from './components/WishlistPage';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import SubCategoryProducts from './components/SubCategoryProducts';
import Profile from './pages/Profile';
import Overview from './pages/Overview';
import CheckoutPage from './pages/Checkout';

function App() {
  const location = useLocation();

  // Hide layout for auth pages only
  const hideLayout = ['/login', '/register'].includes(location.pathname);

  return (
    <main className='relative min-h-screen overflow-x-hidden'>
      {!hideLayout && <Topbar />}
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/categories/:id" element={<SubCategories />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:subcategoryId" element={<SubCategoryProducts />} />
        <Route path="/productdetail/:productId" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>

      {!hideLayout && <Footer />}
    </main>
  )
}

export default App