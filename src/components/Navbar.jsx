
import { Link } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="navbar navbar-dark bg-dark py-3">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 gap-md-3 w-100">
          <Link
            className="navbar-brand fw-bold mb-0"
            to="/"
            onClick={() => setSearchTerm("")}
            style={{ textDecoration: "none" }}
          >
            Meetup App
          </Link>

          <div className="w-100 navbar-search">
            <input
              type="search"
              className="form-control"
              placeholder="Search events by title or tag..."
              aria-label="Search events by title or tag"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
