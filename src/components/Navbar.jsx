import { Link } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="navbar navbar-dark bg-dark py-3">
      <div className="container">
        <Link
          className="navbar-brand fw-bold"
          to="/"
          onClick={() => setSearchTerm("")}
          style={{ textDecoration: "none" }}
        >
          Meetup App
        </Link>

        <div className="ms-auto" style={{ width: "300px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search events by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

