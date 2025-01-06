import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  price: number;
  availableSeats: number;
  image: string;
  category: string;
  description: string;
}

const allEvents: Event[] = [
  {
    id: 1,
    title: "Rock Revolution 2025",
    artist: "Various Artists",
    date: "2025-03-15",
    time: "19:00",
    venue: "Mega Arena",
    price: 49.99,
    availableSeats: 150,
    image: "/images/concert1.jpg",
    category: "Rock",
    description: "Experience the ultimate rock concert featuring top bands!"
  },
  {
    id: 2,
    title: "Jazz Night Special",
    artist: "Jazz Ensemble",
    date: "2025-04-05",
    time: "20:00",
    venue: "Blue Note Club",
    price: 39.99,
    availableSeats: 80,
    image: "/images/concert2.jpg",
    category: "Jazz",
    description: "A sophisticated evening of smooth jazz and fine dining"
  },
  {
    id: 3,
    title: "Pop Extravaganza",
    artist: "Pop Stars United",
    date: "2025-05-20",
    time: "18:30",
    venue: "City Stadium",
    price: 59.99,
    availableSeats: 200,
    image: "/images/concert3.jpg",
    category: "Pop",
    description: "The biggest pop music event of the year!"
  },
  {
    id: 4,
    title: "Classical Symphony Night",
    artist: "City Philharmonic Orchestra",
    date: "2025-06-10",
    time: "19:30",
    venue: "Grand Concert Hall",
    price: 79.99,
    availableSeats: 120,
    image: "/images/concert4.jpg",
    category: "Classical",
    description: "An evening of timeless classical masterpieces"
  },
  {
    id: 5,
    title: "Electronic Dance Festival",
    artist: "Top DJs Collective",
    date: "2025-07-01",
    time: "21:00",
    venue: "Beach Arena",
    price: 69.99,
    availableSeats: 300,
    image: "/images/concert5.jpg",
    category: "Electronic",
    description: "Dance the night away with world-class DJs"
  },
  {
    id: 6,
    title: "Country Music Fest",
    artist: "Country Stars Band",
    date: "2025-08-15",
    time: "17:00",
    venue: "Outdoor Stadium",
    price: 44.99,
    availableSeats: 250,
    image: "/images/concert6.jpg",
    category: "Country",
    description: "A celebration of country music under the stars"
  }
];

const categories = ["All", "Rock", "Jazz", "Pop", "Classical", "Electronic", "Country"];

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(allEvents);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = allEvents.filter(event => {
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.artist.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredEvents(filtered);
  }, [selectedCategory, searchTerm]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <div 
        className="hero-section position-relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/concert-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '8rem 0',
          textAlign: 'center'
        }}
      >
        <div className="container">
          <h1 className="display-3 mb-4 fw-bold">Welcome to Concert Ticket Booking</h1>
          <p className="lead mb-4 fs-4">Book tickets for the most amazing concerts in town</p>
          <div className="search-bar mb-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Link to="/concerts" className="btn btn-primary btn-lg px-5">
            View All Concerts
          </Link>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mt-5">
        <div className="category-filters mb-4">
          <div className="d-flex justify-content-center flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4">Featured Events</h2>
        {filteredEvents.length === 0 ? (
          <div className="text-center py-5">
            <h3>No events found</h3>
            <p>Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="row">
            {filteredEvents.map(event => (
              <div key={event.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm hover-card">
                  <div className="position-relative">
                    <img 
                      src={event.image} 
                      className="card-img-top" 
                      alt={event.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-primary">{event.category}</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0">{event.title}</h5>
                    </div>
                    <h6 className="card-subtitle mb-3 text-muted">{event.artist}</h6>
                    <p className="card-text">{event.description}</p>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="mb-0 text-primary fw-bold">${event.price}</p>
                          <small className="text-muted">{event.availableSeats} seats left</small>
                        </div>
                        <Link to={`/book/${event.id}`} className="btn btn-outline-primary">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-white">
                    <small className="text-muted">
                      {new Date(event.date).toLocaleDateString()} at {event.time} | {event.venue}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistics Section */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <h2 className="display-4 fw-bold text-primary">50+</h2>
              <p className="lead">Upcoming Events</p>
            </div>
            <div className="col-md-4 mb-4">
              <h2 className="display-4 fw-bold text-primary">10K+</h2>
              <p className="lead">Happy Customers</p>
            </div>
            <div className="col-md-4 mb-4">
              <h2 className="display-4 fw-bold text-primary">100%</h2>
              <p className="lead">Secure Booking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-5">
        <div className="container text-center">
          <h3 className="mb-4">Ready to experience live music?</h3>
          <p className="lead mb-4">Don't miss out on these amazing concerts. Book your tickets now!</p>
          <Link to="/register" className="btn btn-primary btn-lg px-5">
            Sign Up Now
          </Link>
        </div>
      </div>

   

      
    </div>
  );
};

export default Home;
