import { useLocation, useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaDownload } from 'react-icons/fa';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, event } = location.state || {};

  if (!booking || !event) {
    navigate('/events');
    return null;
  }

  return (
    <div className="container my-5">
      <div className="card">
        <div className="card-body text-center">
          <div className="mb-4">
            <FaTicketAlt size={50} className="text-success" />
          </div>
          <h2 className="card-title mb-4">Booking Confirmed!</h2>
          <p className="lead mb-4">Thank you for your purchase. Your tickets have been booked successfully.</p>
          
          <div className="row justify-content-center mb-4">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Booking Details</h4>
                  <div className="text-start">
                    <p><strong>Booking ID:</strong> {booking.id}</p>
                    <p><strong>Event:</strong> {event.title}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Number of Tickets:</strong> {booking.numberOfTickets}</p>
                    <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
                    <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex gap-3 justify-content-center">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/my-tickets')}
            >
              View My Tickets
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                // In a real application, this would generate and download a PDF ticket
                alert('Ticket download functionality would be implemented here');
              }}
            >
              <FaDownload className="me-2" />
              Download Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
