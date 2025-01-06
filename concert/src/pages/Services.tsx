import { FaTicketAlt, FaUserPlus, FaCalendarCheck, FaHeadset } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaTicketAlt />,
      title: 'Ticket Booking',
      description: 'Easy and secure online ticket booking for all events.',
      features: ['Instant confirmation', 'Secure payment', 'E-tickets available']
    },
    {
      icon: <FaUserPlus />,
      title: 'VIP Packages',
      description: 'Exclusive VIP experiences for special events.',
      features: ['Meet & Greet', 'Premium seating', 'Exclusive merchandise']
    },
    {
      icon: <FaCalendarCheck />,
      title: 'Event Planning',
      description: 'Professional event planning and management services.',
      features: ['Venue selection', 'Artist booking', 'Event promotion']
    },
    {
      icon: <FaHeadset />,
      title: 'Customer Support',
      description: '24/7 customer support for all your queries.',
      features: ['Live chat', 'Email support', 'Phone support']
    }
  ];

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Our Services</h1>
      
      <div className="row g-4">
        {services.map((service, index) => (
          <div key={index} className="col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <div className="fs-2 text-primary me-3">
                    {service.icon}
                  </div>
                  <h3 className="mb-0">{service.title}</h3>
                </div>
                <p className="card-text">{service.description}</p>
                <ul className="list-unstyled">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="mb-2">
                      <i className="bi bi-check2 text-success me-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="text-center mt-5">
        <h3>Need Custom Services?</h3>
        <p className="mb-4">Contact us for specialized event planning and management services</p>
        <button className="btn btn-primary btn-lg">Contact Us</button>
      </div>
    </div>
  );
};

export default Services;
