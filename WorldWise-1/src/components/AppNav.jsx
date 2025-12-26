import { Link } from "react-router-dom";

import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="city">City</Link>
        </li>
        <li>
          <Link to="country">Country</Link>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
