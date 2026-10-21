import { useState } from "react";
import useFetch from "../useFetch";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const EventCard = () => {
  const { data, loading, error } = useFetch(
    `https://be-meetup-app.vercel.app/events`
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [ eventType, setEventType ] = useState("All");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const events = data?.data ?? [];

  const filteredEvents = events.filter((event) => {

    const matchesTitle = event.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = eventType === "All" || event.type === eventType;

    return matchesTitle && matchesType;
  }
  );

  const resetFilters = () => {
    setSearchTerm("");
    setEventType("All")
  }


  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="container py-4">
        <h2 className="text-center mb-4">Meetup Events</h2>

         <div className="row g-3 align-items-end mb-4">
          <div className="col-md-6">
            <label htmlFor="eventType" className="form-label">
              Filter by event type
            </label>

            <select
              id="eventType"
              className="form-select"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="All">All Event Types</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>

        <p className="text-muted">
          Showing {filteredEvents.length} of {events.length} events
        </p>


 {/* Event cards */}
        <div className="row g-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div className="col-12 col-sm-6 col-lg-4 d-flex" key={event._id}>
                <Link to={`/events/${event._id}`} className="text-decoration-none text-dark d-flex w-100">
                <div className="card shadow-sm w-100 h-100">
                  <img
                    src={event.image}
                    className="card-img-top"
                    alt={event.title}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>

                    <p className="card-text">
                      Date: {new Date(event.date).toLocaleDateString()}
                    </p>

                    <span
                      className={`badge ${
                        event.type === "Online"
                          ? "bg-success"
                          : "bg-primary"
                      }`}
                    >
                      {event.type}
                    </span>
                  </div>
                </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center">No events found.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EventCard;
