import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <h2 className="mb-4">Get in Touch</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input type="text" className="form-control" id="subject" required />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" rows={5} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>

        <div className="col-md-6">
          <h2 className="mb-4">Contact Information</h2>
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <FaPhone className="text-primary me-3 fs-4" />
                <div>
                  <h5 className="mb-1">Phone</h5>
                  <p className="mb-0">+1 234 567 890</p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <FaEnvelope className="text-primary me-3 fs-4" />
                <div>
                  <h5 className="mb-1">Email</h5>
                  <p className="mb-0">contact@concerttickets.com</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <FaMapMarkerAlt className="text-primary me-3 fs-4" />
                <div>
                  <h5 className="mb-1">Address</h5>
                  <p className="mb-0">123 Concert Street<br />New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-4">
            <h3 className="mb-3">Location</h3>
            <div className="ratio ratio-16x9">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645004254050!5m2!1sen!2s" 
                className="border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
