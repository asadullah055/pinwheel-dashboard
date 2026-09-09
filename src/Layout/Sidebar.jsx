import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { navMenu } from "./menuItem";

const Sidebar = ({ show, isCollapsed = false, onToggleCollapse }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const location = useLocation();
  const toggleMenu = (id) => {
    setExpandedMenu((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (isCollapsed) {
      setExpandedMenu(null);
    }
  }, [isCollapsed]);

  // Get user and role from Redux state
  const user = useSelector((state) => state.auth.user);
  const userRole = user?.role;

  // Filter nav items by role: show all for admin, else omit items with role 'admin'
  const filteredMenu = navMenu.filter((nav) => {
    // if nav has no role restriction, always include
    if (!nav.role) return true;
    // include only if user's role matches
    return nav.role === userRole;
  });

  return (
    <aside
      className={`h-screen absolute z-99 left-0 top-0 bg-[#1C2434] md:static text-white w-64 md:translate-x-0 transition-all duration-300 ${isCollapsed ? "md:w-20" : "md:w-64"} ${show ? "-translate-x-0" : "-translate-x-full"
        } flex flex-col `}
    >
      <div className={`flex items-center gap-2 p-4 ${isCollapsed ? "md:justify-center md:px-3" : "justify-between"}`}>
        <Link className={`${isCollapsed ? "md:hidden" : "block"}`} to="/">
          <img
            className="rounded-sm"
            src="/image/darklogo.png"
            alt="Logo"
          />
        </Link>
        <button
          type="button"
          className="hidden h-8 w-8 shrink-0 items-center justify-center rounded bg-white/10 text-white transition hover:bg-white/20 md:flex"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className={`flex-1 ${isCollapsed ? "px-3" : "px-4"}`}>
          <ul className="font-medium">
            {filteredMenu.map((nav) => {
              // Check if the current path matches any child path
              const activeParent = nav.child?.some(
                (item) => location.pathname === item.path
              );
              const Icon = nav.icon;
              const isActive = location.pathname === nav.path || activeParent;
              const itemContent = (
                <>
                  <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-2"}`}>
                    <span className="text-lg">{Icon ? <Icon /> : null}</span>
                    {!isCollapsed && <span>{nav.title}</span>}
                  </div>
                  {nav.child && !isCollapsed && (
                    <IoIosArrowDown
                      className={`transition-all duration-300 ${expandedMenu === nav.id ? "rotate-180 " : ""
                        }`}
                    />
                  )}
                </>
              );

              return (
                <li key={nav.id} className="mb-2 flex flex-col">
                  {nav.child ? (
                    <button
                      type="button"
                      className={`flex w-full items-center rounded px-[8px] py-[10px] text-left text-[#dee4ee] transition-all duration-150 hover:bg-gray-700 ${isCollapsed ? "justify-center" : "justify-between"} ${isActive
                        ? "bg-gray-700 text-white"
                        : ""
                        }`}
                      onClick={() => {
                        if (isCollapsed) {
                          onToggleCollapse?.();
                          setExpandedMenu(nav.id);
                          return;
                        }

                        toggleMenu(nav.id);
                      }}
                      title={nav.title}
                    >
                      {itemContent}
                    </button>
                  ) : (
                    <Link
                      className={`flex items-center rounded px-[8px] py-[10px] text-[14px] text-[#dee4ee] transition-all duration-150 hover:bg-gray-700 ${isCollapsed ? "justify-center" : "justify-between"} ${isActive
                        ? "bg-gray-700 text-white"
                        : ""
                        }`}
                      to={nav.path}
                      title={nav.title}
                    >
                      {itemContent}
                    </Link>
                  )}
                  {nav.child && !isCollapsed && (
                    <ul
                      className={`pl-4 overflow-hidden transition-all duration-300 ease-in-out ${expandedMenu === nav.id ? "max-h-52" : "max-h-0"
                        }`}
                    >
                      {nav.child.map((item) => {
                        return (
                          <li key={item.id} className="py-1 ml-3">
                            <Link
                              to={item.path}
                              className={`font-semibold text-[14px] hover:text-white transition-all duration-300 ${location.pathname === item.path
                                ? "text-white "
                                : "text-[#8A99AF]"
                                }`}
                            >
                              <span className="flex items-center gap-2">
                                <GoDotFill />
                                {item.title}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
