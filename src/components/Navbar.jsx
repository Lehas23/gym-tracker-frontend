import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/profile" style={{ marginRight: "16px" }}>
        Profile
      </Link>
      <Link to="/templates" style={{ marginRight: "16px" }}>
        Templates
      </Link>
      <Link to="/sessions">Sessions</Link>
    </nav>
  );
}

export default Navbar;
