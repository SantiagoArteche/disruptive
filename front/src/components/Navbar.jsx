import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <header className="flex justify-between px-10 py-3 bg-gray-800 items-center">
        <Link to={"/"}>
          <img
            src="https://disruptivestudio.com/images/logo/logo.svg"
            height={240}
            width={240}
          />
        </Link>
        <Link
          to={"/login"}
          className=" bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
        >
          Autenticación
        </Link>
      </header>
      <Outlet />
    </>
  );
};
