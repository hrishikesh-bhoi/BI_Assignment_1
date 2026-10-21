
import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch";
import Footer from "./Footer";

const EventDetails = () => {
  const { eventId } = useParams();

  const { data, loading, error } = useFetch(
    `https://be-meetup-app.vercel.app/events/${eventId}`
  );

  if (loading) {
    return <p className="container">Loading...</p>;
  }

  if (error) {
    return <p className="container">Error: {error}</p>;
  }

  const event = data?.data;

  if (!event || !event._id) {
    return (
      <div className="container mt-4">
        <p>Event not found.</p>
        <Link to="/" className="btn btn-primary">
          &larr; Back to Events
        </Link>
      </div>
    );
  }

  const speakers = event.speakers ?? [];
  const sessions = event.sessions ?? [];
  const tags = event.tags ?? [];
  const pricing = event.pricing ?? {};
  const venue = event.venue ?? {};
  const attendeeInfo = event.attendeeInfo ?? {};

  return (
    <>
      <main className="container py-4">
        <Link to="/" className="btn btn-primary mb-3">
          &larr; Back to Events
        </Link>

        <div className="card shadow-sm mb-4">
          <img
            src={event.image}
            alt={event.title}
            className="card-img-top"
            style={{ height: "350px", objectFit: "cover" }}
          />

          <div className="card-body">
            <h2 className="card-title">{event.title}</h2>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              <span
                className={`badge ${
                  event.type === "Online" ? "bg-success" : "bg-primary"
                }`}
              >
                {event.type}
              </span>
            </p>

            <p>
              <strong>Topic:</strong> {event.topic}
            </p>

            <p>
              <strong>Description:</strong> {event.description}
            </p>

            {/* Venue */}
            <hr />
            <h4>Venue</h4>

            {event.type === "Online" ? (
              <p>Google Meet</p>
            ) : (
              <>
                <p>{venue.name || "Venue not specified"}</p>
                {venue.address && <p>{venue.address}</p>}
                {venue.city && <p>{venue.city}</p>}
              </>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <>
                <hr />
                <h4>Tags</h4>
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="badge bg-secondary me-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </>
            )}

            {/* Speakers */}
            {speakers.length > 0 && (
              <>
                <hr />
                <h4>Speakers</h4>
                <div className="row g-3">
                  {speakers.map((speaker, index) => (
                    <div className="col-12 col-md-6" key={index}>
                      <div className="card h-100 p-3">
                        {speaker.image && (
                          <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="rounded mb-2"
                            style={{
                              width: "90px",
                              height: "90px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                        <h5>{speaker.name}</h5>
                        {speaker.designation && (
                          <p className="mb-0">{speaker.designation}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Sessions */}
            {sessions.length > 0 && (
              <>
                <hr />
                <h4>Sessions</h4>
                {sessions.map((session, index) => (
                  <div className="border rounded p-3 mb-2" key={index}>
                    <h5>{session.title}</h5>
                    <p className="mb-0">
                      {session.startTime} - {session.endTime}
                    </p>
                  </div>
                ))}
              </>
            )}

            {/* Pricing */}
            <hr />
            <h4>Pricing</h4>
            {pricing.isPaid ? (
              <p>
                {pricing.currency || "INR"} {pricing.amount}
              </p>
            ) : (
              <p>Free Entry</p>
            )}

            {/* Attendee Information */}
            {(attendeeInfo.dressCode ||
              attendeeInfo.ageRestriction ||
              attendeeInfo.additionalInfo) && (
              <>
                <hr />
                <h4>Attendee Information</h4>

                {attendeeInfo.dressCode && (
                  <p>
                    <strong>Dress Code:</strong> {attendeeInfo.dressCode}
                  </p>
                )}

                {attendeeInfo.ageRestriction && (
                  <p>
                    <strong>Age Restriction:</strong>{" "}
                    {attendeeInfo.ageRestriction}
                  </p>
                )}

                {attendeeInfo.additionalInfo && (
                  <p>
                    <strong>Additional Information:</strong>{" "}
                    {attendeeInfo.additionalInfo}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default EventDetails;
