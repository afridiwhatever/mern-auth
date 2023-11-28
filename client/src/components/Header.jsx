import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-200 flex justify-center">
      <div className="w-full max-w-6xl flex justify-between p-3 items-center">
        {/* logo div */}
        <Link to="/" className="font-bold">
          Auth App
        </Link>

        {/* Actions container div, need to change to LI formatting later */}
        <ul className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/signin">Sign In</Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
