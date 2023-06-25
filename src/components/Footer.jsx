import SandPool from "../assets/images/SandPool-1.png";

const Footer = () => {
  return (
    <div>
      <footer className="p-4 gradient-bg-footer shadow md:px-6 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0 justify-start">
            <img
              src={SandPool}
              className="w-32 lg:w-44 cursor-pointer mr-3"
              alt="SandPool Logo"
            />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-xs justify-center md:text-sm text-gray-300 font-mono sm:mb-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-400 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-400 font-mono sm:text-center text-center">
          &copy; 2023{" "}
          <a href="#" className="hover:underline">
            SandPool
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </div>
  );
};

export default Footer;
