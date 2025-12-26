import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from "./AppLayout.module.css";

function AppLayout({ cities }) {
  return (
    <div className={styles.app}>
      <Sidebar />
      <User />
      <Map cities={cities} />
    </div>
  );
}

export default AppLayout;
