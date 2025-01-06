import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  price: number;
  availableSeats: number;
}

const Booking = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [tickets, setTickets] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock API call - replace with actual API
    setEvent({
      id: Number(eventId),
      title: "Rock Concert 2025",
      date: "2025-02-15",
      location: "New York",
      price: 99.99,
      availableSeats: 100
    });
  }, [eventId]);

  const handleBooking = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual booking API
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Booking successful!');
      navigate('/bookings');
    } catch (error) {
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{event.title}</h2>
              <div className="mb-4">
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Price per ticket:</strong> ${event.price}</p>
                <p><strong>Available seats:</strong> {event.availableSeats}</p>
              </div>

              <div className="mb-4">
                <label className="form-label">Number of Tickets:</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max={event.availableSeats}
                  value={tickets}
                  onChange={(e) => setTickets(parseInt(e.target.value))}
                />
              </div>

              <div className="mb-4">
                <h4>Order Summary</h4>
                <p>Tickets: {tickets} x ${event.price}</p>
                <p><strong>Total: ${(tickets * event.price).toFixed(2)}</strong></p>
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={handleBooking}
                disabled={loading || tickets < 1 || tickets > event.availableSeats}
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
