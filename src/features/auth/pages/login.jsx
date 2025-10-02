import Navbar from '../../../shared/components/Navbar';
import LoginComponent from '../components/login';
import Footer from '../../../shared/components/Footer';

const Login = () => {
  return (
    <div className="bg-white">
      <Navbar  />
      <LoginComponent />
      <Footer />
    </div>
  );
};

export default Login;
