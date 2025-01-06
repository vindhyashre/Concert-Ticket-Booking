import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Concert Tickets</h5>
            <p>Your one-stop destination for booking concert tickets. Experience the best live performances with us!</p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/events" className="text-light text-decoration-none">Events</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Connect With Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-4"><FaFacebook /></a>
              <a href="#" className="text-light fs-4"><FaTwitter /></a>
              <a href="#" className="text-light fs-4"><FaInstagram /></a>
              <a href="#" className="text-light fs-4"><FaYoutube /></a>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Concert Tickets. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
