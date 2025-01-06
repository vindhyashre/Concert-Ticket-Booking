import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEventStore } from '../store/eventStore';
import { useBookingStore } from '../store/bookingStore';
import { FaCreditCard, FaPaypal, FaGooglePay, FaApplePay } from 'react-icons/fa';

const BookingConfirmation = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events } = useEventStore();
  const { addBooking } = useBookingStore();
  
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const event = events.find(e => e.id === Number(eventId));
  
  if (!event) {
    return <div className="container mt-5">Event not found</div>;
  }

  const totalAmount = event.price * numberOfTickets;

  const handleBooking = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const booking = addBooking({
      eventId: event.id,
      userId: localStorage.getItem('userId') || '',
      numberOfTickets,
      totalAmount,
      bookingDate: new Date().toISOString(),
      paymentMethod,
      status: 'confirmed'
    });

    setIsProcessing(false);
    navigate('/booking-success', { 
      state: { 
        booking,
        event
      }
    });
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title mb-4">Booking Confirmation</h2>
              
              {/* Event Details */}
              <div className="mb-4">
                <h4>Event Details</h4>
                <div className="row">
                  <div className="col-md-4">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-8">
                    <h5>{event.title}</h5>
                    <p className="mb-1">Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p className="mb-1">Time: {event.time}</p>
                    <p className="mb-1">Location: {event.location}</p>
                    <p>Price per ticket: ${event.price}</p>
                  </div>
                </div>
              </div>

              {/* Ticket Selection */}
              <div className="mb-4">
                <h4>Number of Tickets</h4>
                <select 
                  className="form-select"
                  value={numberOfTickets}
                  onChange={(e) => setNumberOfTickets(Number(e.target.value))}
                >
                  {Array.from({ length: Math.min(10, event.availableSeats) }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'ticket' : 'tickets'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Methods */}
              <div className="mb-4">
                <h4>Payment Method</h4>
                <div className="row g-3">
                  <div className="col-6 col-md-3">
                    <div 
                      className={`card h-100 ${paymentMethod === 'credit-card' ? 'border-primary' : ''}`}
                      onClick={() => setPaymentMethod('credit-card')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body text-center">
                        <FaCreditCard size={24} className="mb-2" />
                        <div>Credit Card</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div 
                      className={`card h-100 ${paymentMethod === 'paypal' ? 'border-primary' : ''}`}
                      onClick={() => setPaymentMethod('paypal')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body text-center">
                        <FaPaypal size={24} className="mb-2" />
                        <div>PayPal</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div 
                      className={`card h-100 ${paymentMethod === 'google-pay' ? 'border-primary' : ''}`}
                      onClick={() => setPaymentMethod('google-pay')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body text-center">
                        <FaGooglePay size={24} className="mb-2" />
                        <div>Google Pay</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div 
                      className={`card h-100 ${paymentMethod === 'apple-pay' ? 'border-primary' : ''}`}
                      onClick={() => setPaymentMethod('apple-pay')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body text-center">
                        <FaApplePay size={24} className="mb-2" />
                        <div>Apple Pay</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Order Summary</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Tickets ({numberOfTickets})</span>
                <span>${(event.price * numberOfTickets).toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Service Fee</span>
                <span>${(2.5 * numberOfTickets).toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong>${(totalAmount + 2.5 * numberOfTickets).toFixed(2)}</strong>
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={handleBooking}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
