import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4
                 backdrop-blur-md bg-white/10 border-b border-white/10 shadow-lg"
    >
      {/* Logo / Brand */}
      <Link to="/" className="text-2xl font-extrabold tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          RESUM-AI
        </span>
      </Link>

      {/* Upload Button */}
      <Link
        to="/upload"
        className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 
                   text-white font-medium hover:scale-105 hover:shadow-lg transition-transform duration-300"
      >
        Upload Resume
      </Link>
    </nav>
  );
};

export default Navbar;

