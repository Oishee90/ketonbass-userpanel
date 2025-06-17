import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div>
      <nav
        className={`bg-white container mx-auto rounded-full text-white transition-all duration-300 
      `}
      >
        <div className="container mx-auto flex justify-between items-center 2xl:py-4 px-6">
          {/*  Left: Logo */}
          <div className="text-xl md:text-3xl lg:text-4xl font-extrabold">
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Home</span>
              <img src={logo} alt="" className="" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
