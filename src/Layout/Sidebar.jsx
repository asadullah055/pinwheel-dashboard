import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { navMenu } from "./menuItem";

const Sidebar = ({ show }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const location = useLocation();
  const toggleMenu = (id) => {
    setExpandedMenu((prev) => (prev === id ? null : id));
  };

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
      className={`h-screen absolute z-99 left-0 top-0 bg-[#1C2434] md:static text-white w-64 md:translate-x-0 transition-all duration-300 ${
        show ? "-translate-x-0" : "-translate-x-full"
      } flex flex-col `}
    >
      <div className="text-2xl font-bold p-4 rounded-sm">
        <img className="rounded-sm" src="/image/logo.png" alt="Logo" />
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="flex-1 px-4">
          <ul className="font-medium">
            {filteredMenu.map((nav) => {
              // Check if the current path matches any child path
              const activeParent = nav.child?.some(
                (item) => location.pathname === item.path
              );
              return (
                <li key={nav.id} className="mb-2 flex flex-col">
                  <div
                    className={`flex items-center justify-between cursor-pointer rounded px-[8px] py-[10px] hover:bg-gray-700 text-[#dee4ee] transition-all duration-150 ${
                      location.pathname === nav.path || activeParent
                        ? "bg-gray-700 text-white"
                        : ""
                    }`}
                    onClick={() => toggleMenu(nav.id)}
                  >
                    <Link className="text-[18px] w-full" to={nav.path}>
                      <div className="flex items-center gap-2">
                        <span>{<nav.icon />}</span> {nav.title}
                      </div>
                    </Link>
                    {nav.child && (
                      <IoIosArrowDown
                        className={`transition-all duration-300 ${
                          expandedMenu === nav.id ? "rotate-180 " : ""
                        }`}
                      />
                    )}
                  </div>
                  {nav.child && (
                    <ul
                      className={`pl-4 overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedMenu === nav.id ? "max-h-52" : "max-h-0"
                      }`}
                    >
                      {nav.child.map((item) => {
                        return (
                          <li key={item.id} className="py-1 ml-3">
                            <Link
                              to={item.path}
                              className={`font-semibold hover:text-white transition-all duration-300 ${
                                location.pathname === item.path
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
