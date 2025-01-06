import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendar, FaMapMarkerAlt, FaTicketAlt, FaClock } from 'react-icons/fa';
import { useEventStore } from '../store/eventStore';

const Events = () => {
  const { events } = useEventStore();
  const [filter, setFilter] = useState({ category: '', location: '', date: '' });
  const navigate = useNavigate();
  const currentDate = new Date();

  const handleBooking = (eventId: number) => {
    navigate(`/booking/${eventId}`);
  };

  const filterEvents = (events: any[]) => {
    return events.filter(event => {
      return (
        (!filter.category || event.category === filter.category) &&
        (!filter.location || event.location.includes(filter.location)) &&
        (!filter.date || event.date === filter.date)
      );
    });
  };

  const isUpcoming = (date: string) => new Date(date) >= currentDate;
  const upcomingEvents = filterEvents(events).filter(event => isUpcoming(event.date));
  const pastEvents = filterEvents(events).filter(event => !isUpcoming(event.date));

  return (
    <div className="container mt-4">
      {/* Hero Section */}
      <div className="hero-section text-center py-5 mb-5 bg-primary text-white rounded">
        <h1 className="display-4">Discover Amazing Concerts</h1>
        <p className="lead">Book tickets for the best musical experiences</p>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <select 
            className="form-select"
            value={filter.category}
            onChange={(e) => setFilter({...filter, category: e.target.value})}
          >
            <option value="">All Categories</option>
            <option value="Rock">Rock</option>
            <option value="Jazz">Jazz</option>
            <option value="Pop">Pop</option>
            <option value="Classical">Classical</option>
          </select>
        </div>
        <div className="col-md-4">
          <input 
            type="text"
            className="form-control"
            placeholder="Search by location..."
            value={filter.location}
            onChange={(e) => setFilter({...filter, location: e.target.value})}
          />
        </div>
        <div className="col-md-4">
          <input 
            type="date"
            className="form-control"
            value={filter.date}
            onChange={(e) => setFilter({...filter, date: e.target.value})}
          />
        </div>
      </div>

      {/* Upcoming Events */}
      <h2 className="mb-4">Upcoming Events</h2>
      <div className="row">
        {upcomingEvents.map(event => (
          <div key={event.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img 
                src={event.imageUrl} 
                className="card-img-top" 
                alt={event.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.description}</p>
                <div className="mb-3">
                  <p className="mb-1">
                    <FaCalendar className="me-2" />
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="mb-1">
                    <FaClock className="me-2" />
                    {event.time}
                  </p>
                  <p className="mb-1">
                    <FaMapMarkerAlt className="me-2" />
                    {event.location}
                  </p>
                  <p className="mb-1">
                    <FaTicketAlt className="me-2" />
                    ${event.price}
                  </p>
                </div>
                <button 
                  className={`btn btn-${event.availableSeats === 0 ? 'secondary' : 'primary'} w-100`}
                  onClick={() => handleBooking(event.id)}
                  disabled={event.availableSeats === 0}
                >
                  {event.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <>
          <h2 className="mb-4 mt-5">Past Events</h2>
          <div className="row">
            {pastEvents.map(event => (
              <div key={event.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 bg-light">
                  <img 
                    src={event.imageUrl} 
                    className="card-img-top" 
                    alt={event.title}
                    style={{ height: '200px', objectFit: 'cover', opacity: '0.7' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-muted">{event.title}</h5>
                    <p className="card-text text-muted">{event.description}</p>
                    <div className="mb-3">
                      <p className="mb-1 text-muted">
                        <FaCalendar className="me-2" />
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="mb-1 text-muted">
                        <FaMapMarkerAlt className="me-2" />
                        {event.location}
                      </p>
                    </div>
                    <span className="badge bg-secondary">Event Completed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Events;
