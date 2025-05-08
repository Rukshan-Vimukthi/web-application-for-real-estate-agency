import { Icon7Circle, List, MenuButton } from 'react-bootstrap-icons';
import './css/style.css';
import { Row } from 'react-bootstrap';


export default function NavBar(props){

  const defaultContent = (
    <>
      <div className="col-12 col-sm-6 col-md-6">
        <a href='/Register'><button className='btn fs-5 text-white'>Register</button></a>
      </div>
      <div className="col-12 col-sm-1 col-md-6">
        <a href='/login'><button className='btn fs-5 text-white'>Login</button></a>
      </div>
    </>
  );

  const loggedInContent = (
    <>
      <div className="col-12 col-sm-6 col-md-6 d-flex align-items-center">
        <a href='/profile' className='link text-decoration-none text-white'>Profile</a>
      </div>
      <div className="col-12 col-sm-1 col-md-6 d-flex align-items-center">
        <a href='/logout' className='logout text-decoration-none text-white'>Logout</a>
      </div>
    </>
  );

  let currentContent = "";
  if (props.isLoggedIn){
    currentContent = loggedInContent;
  }else{
    currentContent = defaultContent;
  }

    return (
        <Row className="nav navbar-expand-md position-fixed top-0 z-1 start-0 px-3 py-1 vw-100 text-white-50 fs-5 m-0 p-0" style={{background: "linear-gradient(45deg, #FFF 18%, #000 18%, #000 20%, #000 20%, #AAA 20%, #AAA 21%, #000 21%)", backdropFilter: "blur(100px)"}} role='navigation'>
            <div className="d-md-none col-2 p-0 d-flex align-items-center text-black">
                <button className='navbar-toggler p-0 bg-white rounded-2' type='button' data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                    <List className='fs-1'/>
                </button>
            </div>
            <div className="col-9 col-md-1 d-flex justify-content-md-start justify-content-center align-items-center ps-3">
                <div className="row rounded-3 bg-black text-white border-white border-2 px-4 py-2 mb-1">Logo</div>
            </div>
            <div className="col-md-8 d-none d-md-flex justify-content-center justify-content-md-center">
                <ul className="m-0 d-flex flex-row align-items-center text-white-50 list-unstyled">
                    <a href='/' className=' text-decoration-none text-white'><li className="rounded-5 nav-button px-2 px-lg-3 px-xl-4">Home</li></a>
                    <a href='/explore' className=' text-decoration-none text-white'><li className="rounded-5 nav-button px-2 px-lg-3 px-xl-4">Explore</li></a>
                    <a href='/' className=' text-decoration-none text-white'><li className="rounded-5 nav-button px-2 px-lg-3 px-xl-4">About Us</li></a>
                    <a href='/' className=' text-decoration-none text-white'><li className="rounded-5 nav-button px-2 px-lg-3 px-xl-4">Contact</li></a>
                </ul>
            </div>
          
            <div className="col-md-4 d-none d-md-flex justify-content-end justify-content-md-start">
              <div className="row d-flex justify-content-end justify-content-md-start align-items-center">
                  {/* altering content */}
                  {currentContent}
                </div>
            </div>
            <div className="col-10 p-0 collapse navbar-collapse" id='navbarSupportedContent'>
                <Row>
                  <ul className="navbar-nav m-0 text-white bg-black d-md-none">
                    <a href='/' className=' text-decoration-none text-white'><li className="rounded-5 nav-button px-2 px-lg-3 px-xl-4">Home</li></a>
                    <a href='/explore' className=' text-decoration-none text-white'><li className="rounded-5 nav-button px-2 px-lg-3 px-xl-4">Explore</li></a>
                    <a href='/' className=' text-decoration-none text-white'><li className="rounded-5 nav-button px-2 px-lg-3 px-xl-4">About Us</li></a>
                    <a href='/' className=' text-decoration-none text-white'><li className="rounded-5 nav-button px-2 px-lg-3 px-xl-4">Contact</li></a>
                  </ul>
                </Row>
                <Row className='bg-black py-2 rounded-bottom-4 gap-2 gap-md-0'>
                  {currentContent}
                </Row>
            </div>
        </Row>
    );
}



{/* 
<nav class="navbar navbar-expand-lg bg-light">
<div class="container-fluid">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled">Disabled</a>
      </li>
    </ul>
    <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</div>
    </nav> 

*/}