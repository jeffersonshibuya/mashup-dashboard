import {
  ChartPieSlice,
  FileText,
  HardDrives,
  PlusCircle,
  SignOut,
} from 'phosphor-react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo_rbg.png';
import { useUserAuth } from '../context/UserAuthXContext';

function Sidebar() {
  const { handleSignOut } = useUserAuth();

  return (
    <aside
      className="sidebar w-64 transform -translate-x-full 
        md:translate-x-0 transition-transform duration-150 ease-in bg-white"
    >
      <div className="sidebar-header flex items-center justify-center p-4">
        <img src={logo} alt="informed by data logo" className="max-h-12" />
      </div>
      <div className="sidebar-content px-4 py-6">
        <ul className="flex flex-col w-full">
          <li className="my-px">
            <NavLink
              to="/"
              className="flex flex-row items-center h-10 px-3 rounded-lg 
              text-gray-700 hover:bg-gray-600 hover:text-white"
            >
              <ChartPieSlice size={22} />
              <span className="ml-3">Dashboard</span>
            </NavLink>
          </li>
          <li className="my-px">
            <span
              className="flex font-medium text-sm text-gray-400 px-4 my-4 
              uppercase"
            >
              APP
            </span>
          </li>
          <li className="my-px">
            <NavLink
              to="app-create"
              className="flex flex-row items-center h-10 px-3 rounded-lg 
              text-gray-700 hover:bg-gray-600 hover:text-white"
            >
              <span className="text-green-400">
                <PlusCircle size={22} />
              </span>
              <span className="ml-3">Add New App</span>
            </NavLink>
          </li>
          <li className="my-px">
            <span
              className="flex font-medium text-sm text-gray-400 px-4 my-4 
              uppercase"
            >
              Config
            </span>
          </li>
          <li className="my-px">
            <NavLink
              to="servers"
              className="flex w-full flex-row items-center h-10 px-3 rounded-lg 
              text-gray-700 hover:bg-gray-600 hover:text-white"
            >
              <HardDrives size={22} />
              <span className="ml-3">Servers</span>
            </NavLink>
          </li>
          <li className="my-px">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full flex-row items-center h-10 px-3 rounded-lg 
              text-gray-700 hover:bg-gray-600 hover:text-white"
            >
              <SignOut size={22} />
              <span className="ml-3">Sign out</span>
            </button>
          </li>
          <li className="my-px">
            <a
              href="https://ipc-global.atlassian.net/l/cp/ZcNVjf11"
              target="_blank"
              className="flex w-full flex-row items-center h-10 px-3 text-blue-700"
              rel="noreferrer"
            >
              <FileText size={22} />
              <span className="ml-3">Documentation</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
