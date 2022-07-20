import { Link } from "react-router-dom";

export default function Navbar({ user, logout }) {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/restaurants"}>
          Restaurants
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/restaurants"}
              >
                Restaurants
              </Link>
            </li>
            <li className="nav-item">
              {user
                ? <a
                    onClick={logout}
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >
                    Logout {user.name}
                  </a>
                : <Link to={"/login"} className="nav-link">
                    Login
                  </Link>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
