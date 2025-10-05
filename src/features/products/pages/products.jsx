import ProductsList from "../product-list/components/ProductList";
import Navbar from '../../../shared/components/Navbar/index.jsx'
import Footer from '../../../shared/components/Footer/index.jsx'
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

function Products() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  const sale = searchParams.get('sale');
  const page = searchParams.get('page');

  // Scroll to top when products page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className='bg-white'>
      <Navbar/>
      <ProductsList 
        searchQuery={searchQuery} 
        initialCategory={category}
        initialSort={sort}
        initialSale={sale}
        initialPage={page}
      />
      <Footer/>
    </div>
  );
}

export default Products;
