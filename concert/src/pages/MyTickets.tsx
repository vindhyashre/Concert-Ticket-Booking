import { useState } from 'react';
import { useBookingStore } from '../store/bookingStore';
import { useEventStore } from '../store/eventStore';
import { FaTicketAlt, FaDownload, FaTimes } from 'react-icons/fa';

const MyTickets = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const { events } = useEventStore();
  const { getUserBookings, cancelBooking } = useBookingStore();
  const userId = localStorage.getItem('userId') || '';
  const bookings = getUserBookings(userId);

  const getEventDetails = (eventId: number) => {
    return events.find(event => event.id === eventId);
  };

  const isUpcoming = (date: string) => {
    return new Date(date) >= new Date();
  };

  const filteredBookings = bookings.filter(booking => {
    const event = getEventDetails(booking.eventId);
    if (!event) return false;
    
    switch (filter) {
      case 'upcoming':
        return isUpcoming(event.date) && booking.status !== 'cancelled';
      case 'past':
        return !isUpcoming(event.date) || booking.status === 'cancelled';
      default:
        return true;
    }
  });

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">My Tickets</h2>

      {/* Filter Buttons */}
      <div className="btn-group mb-4">
        <button
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('all')}
        >
          All Tickets
        </button>
        <button
          className={`btn ${filter === 'upcoming' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming Events
        </button>
        <button
          className={`btn ${filter === 'past' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('past')}
        >
          Past Events
        </button>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-5">
          <FaTicketAlt size={50} className="text-muted mb-3" />
          <h4>No tickets found</h4>
          <p className="text-muted">You haven't booked any tickets yet.</p>
        </div>
      ) : (
        <div className="row">
          {filteredBookings.map(booking => {
            const event = getEventDetails(booking.eventId);
            if (!event) return null;

            const isEventUpcoming = isUpcoming(event.date);

            return (
              <div key={booking.id} className="col-md-6 col-lg-4 mb-4">
                <div className={`card h-100 ${booking.status === 'cancelled' ? 'border-danger' : ''}`}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title">{event.title}</h5>
                      {booking.status === 'cancelled' ? (
                        <span className="badge bg-danger">Cancelled</span>
                      ) : isEventUpcoming ? (
                        <span className="badge bg-success">Upcoming</span>
                      ) : (
                        <span className="badge bg-secondary">Past</span>
                      )}
                    </div>

                    <div className="mb-3">
                      <p className="mb-1">
                        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="mb-1">
                        <strong>Time:</strong> {event.time}
                      </p>
                      <p className="mb-1">
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p className="mb-1">
                        <strong>Tickets:</strong> {booking.numberOfTickets}
                      </p>
                      <p className="mb-1">
                        <strong>Total Amount:</strong> ${booking.totalAmount}
                      </p>
                      <p className="mb-1">
                        <strong>Booking ID:</strong> {booking.id}
                      </p>
                    </div>

                    {booking.status !== 'cancelled' && (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => {
                            // In a real application, this would generate and download a PDF ticket
                            alert('Ticket download functionality would be implemented here');
                          }}
                        >
                          <FaDownload className="me-1" />
                          Download
                        </button>
                        {isEventUpcoming && (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            <FaTimes className="me-1" />
                            Cancel
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
