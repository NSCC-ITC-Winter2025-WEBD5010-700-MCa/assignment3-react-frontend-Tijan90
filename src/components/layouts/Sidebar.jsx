import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faUsers,
  faUsersCog,
  faReply,
  faBoxOpen,
  faArrowLeft,
  faArrowRight,
  faBook,
} from '@fortawesome/free-solid-svg-icons';

const SidebarItem = ({ href, label, isCollapsed, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li className="group">
      <Link
        to={href}
        className={`flex items-center py-2.5 px-4 hover:bg-white transition ${
          isActive ? 'bg-white border-y-2 border-black-500' : ''
        }`}
      >
        <FontAwesomeIcon icon={icon} />
        <span
          className={`text-black text-base font-medium leading-tight ml-4 text-nowrap ${
            isCollapsed ? 'hidden' : 'block'
          }`}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const sidebarItems = [
    { href: '/admin/home', label: 'Dashboard', icon: faChartPie },
    { href: '/admin/user-roles', label: 'User Roles', icon: faUsersCog },
    { href: '/admin/user-management', label: 'User Management', icon: faUsers },
    { href: '/admin/customers', label: 'Customers', icon: faUsers },
    { href: '/admin/auto-response', label: 'Auto Response', icon: faReply },
    { href: '/admin/subscriptions', label: 'Subscriptions', icon: faBoxOpen },
    { href: '/admin/books', label: 'Books', icon: faBook },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-14' : 'w-64'
      } h-full bg-black/5 transition-all duration-300 ease-in-out relative`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-2.5 top-0 w-6 h-6 flex justify-center items-center hover:bg-gray-300 rounded-full transition cursor-pointer focus:outline-none bg-gray-200"
      >
        {isCollapsed ? (
          <FontAwesomeIcon icon={faArrowRight} />
        ) : (
          <FontAwesomeIcon icon={faArrowLeft} />
        )}
      </button>

      {/* Sidebar Navigation */}
      <nav className="mt-4">
        <ul>
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              isCollapsed={isCollapsed}
              icon={item.icon}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
