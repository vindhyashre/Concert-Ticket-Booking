import { useState } from 'react';
import { useEventStore, Event } from '../store/eventStore';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Admin = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEventStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    price: 0,
    availableSeats: 0,
    category: '',
    imageUrl: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      price: 0,
      availableSeats: 0,
      category: '',
      imageUrl: '',
      description: ''
    });
    setSelectedEvent(null);
    setIsEditing(false);
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      price: event.price,
      availableSeats: event.availableSeats,
      category: event.category,
      imageUrl: event.imageUrl,
      description: event.description
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedEvent) {
      updateEvent(selectedEvent.id, formData);
    } else {
      addEvent(formData);
    }
    resetForm();
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Event Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
        >
          <FaPlus className="me-2" />
          Add New Event
        </button>
      </div>

      {/* Event Form */}
      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title mb-4">
              {isEditing ? 'Edit Event' : 'Add New Event'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Available Seats</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.availableSeats}
                    onChange={(e) => setFormData({ ...formData, availableSeats: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Rock">Rock</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Pop">Pop</option>
                    <option value="Classical">Classical</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="url"
                    className="form-control"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Update Event' : 'Add Event'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Events Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Available Seats</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{new Date(event.date).toLocaleDateString()}</td>
                    <td>{event.location}</td>
                    <td>{event.category}</td>
                    <td>${event.price}</td>
                    <td>{event.availableSeats}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleEdit(event)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(event.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
