import ProductDetails from '../product-details/components/ProductDetails/index.jsx'
import Navbar from '../../../shared/components/Navbar/index.jsx'
import Footer from '../../../shared/components/Footer/index.jsx'
import RelatedProducts from '../product-details/components/RelatedProducts/index.jsx';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
  const { id } = useParams();
  
  return (
    <div className='bg-white'>
      <Navbar/>
      <ProductDetails/>
      <RelatedProducts currentProductId={id} />
      <Footer/>
    </div>
  );
};

export default ProductDetailsPage;