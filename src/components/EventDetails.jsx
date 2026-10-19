import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch";


const EventDetails = () => {

    const { eventId } = useParams();

    const { data, loading, error } = useFetch(`https://be-meetup-app.vercel.app/events/${eventId}`);

    if(loading) {
        return <p className="container">Loading...</p>
    }

    if(error) {
        return <p className="container">Error: {error}</p>
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

    return (
        <>
        <div className="container">
            <Link to="/" className="btn btn-primary mb-2 mt-2">
            &larr; Back to Events
            </Link>

            <div className="card shadow-sm">
                <img src={event.image} alt={event.title} className="card-img-top"
          style={{ height: "350px", objectFit: "cover" }} />

            </div>
            <div className="card-body">
                <h2 className="card-title">
                    {event.title}
                </h2>
                <p>
            <strong>Date:</strong>{" "}
            {new Date(event.date).toLocaleDateString()}
          </p>

          <p>
            <strong>Type:</strong> {event.type}
          </p>

          <p>
            <strong>Topic:</strong> {event.topic}
          </p>

          <p>
            <strong>Description:</strong> {event.description}
          </p>
            </div>
        </div>
        </>
    )

}

export default EventDetails;