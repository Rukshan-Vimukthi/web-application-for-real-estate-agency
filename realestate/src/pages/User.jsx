import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import LiveChat from "../components/Livechat/LiveChat";
import 'bootstrap/js/src/collapse.js';


export default function User(props) {
  // alert(props.isLoggedIn);
  return (
    <>
      <NavBar isLoggedIn={props.isLoggedIn}/>
        {props.element}
      <Footer />
      <LiveChat />
      <script src="bootstrap/src/collapse.js"></script>
    </>
  );
}
