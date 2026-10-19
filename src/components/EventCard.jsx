import { useState } from "react";
import useFetch from "../useFetch";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const EventCard = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/events"
  );

  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const events = data?.data ?? [];

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="container py-4">
        <h2 className="text-center mb-4">Meetup Events</h2>

        <div className="row g-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div className="col-md-4" key={event._id}>
                <Link to={`/events/${event._id}`} className="btn btn-primary">
                <div className="card h-100 shadow-sm">
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
      </div>
    </>
  );
};

export default EventCard;
