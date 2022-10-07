import { useUserAuth } from '../context/UserAuthXContext';

function Header() {
  const { user } = useUserAuth();

  const fullNameArray = user.name.split(' ');
  const avatarName =
    fullNameArray[0].charAt(0).toUpperCase() +
    fullNameArray[1].charAt(0).toUpperCase();

  return (
    <header className="header bg-white shadow py-4 px-4 ">
      <div className="header-content flex items-center flex-row">
        {/* <form action="#">
          <div className="hidden md:flex relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <input
              id="search"
              type="text"
              name="search"
              className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
              placeholder="Search..."
            />
          </div>
          <div className="flex md:hidden">
            <a
              href="/#"
              className="flex items-center justify-center h-10 w-10 border-transparent"
            >
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </a>
          </div>
        </form> */}
        <div className="flex ml-auto">
          <div className="flex flex-row items-center">
            <div
              className="h-11 w-11 flex bg-[#0C396E]/90 border rounded-full 
              justify-center items-center font-bold text-white shadow tracking-wider"
            >
              {avatarName}
            </div>
            <span className="flex flex-col ml-2">
              <span className="font-semibold tracking-wide leading-none">
                {user.name}
              </span>
              <span className="text-gray-500 text-xs leading-none mt-1">
                {user.email}
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
