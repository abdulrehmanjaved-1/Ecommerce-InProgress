import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsBySearchAsync, selectItems } from "../cart/CartSlice";
import { selectUserInfo } from "../user/Userslice";
import {
  fetchProductByIdAsync,
  fetchProductsByFilterAsync,
  fetchProductsBySearchAsync,
} from "../product/ProductSlice";

const navigation = [
  { name: "Products", Link: "/", user: true },
  { name: "Products", Link: "/admin", admin: true },
  { name: "Orders", Link: "/admin/orders", admin: true },
];
const NonUserNavigation = [
  { name: "Products", Link: "/", user: true },
];
const userNavigation = [
  { name: "Your Profile", Link: "/profile" },
  { name: "My Orders", Link: "/my-orders" },
  { name: "Sign out", Link: "/logout" },
];
const NonUserNavigationOptions = [
  { name: "Create Account", Link: "/signup" },
  { name: "Login", Link: "/login" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ children }) {
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchProductsByFilterAsync({ searchQuery }));
  }, [searchQuery, dispatch]);

  return (
    <>
      {userInfo ? (
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Link to="/">
                          <img
                            className="h-8 w-8"
                            src="https://cdn-icons-png.flaticon.com/512/1069/1069709.png"
                            alt="Your Company"
                          />
                        </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) =>
                            item[userInfo.role] ? (
                              <Link
                                key={item.name}
                                to={item.Link}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            ) : null
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <input
                          type="text"
                          onChange={handleSearch}
                          id="searchInput"
                          class="border rounded pl-2 mr-5 mt-5 p-2 w-full mb-4"
                          placeholder="Search products..."
                        />

                        <Link to="/carts">
                          <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                        {items.length > 0 && (
                          <span className="inline-flex items-center rounded-md mb-7 -ml-2 bg-red-50 px-2 py-0 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {items.length}
                          </span>
                        )}

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                // src={userInfo.imageUrl}
                                src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_people_person_avatar_white_tone_icon_159363.png"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.Link}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.Link} // Use the appropriate property for the link
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_people_person_avatar_white_tone_icon_159363.png"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {userInfo.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {userInfo.email}
                        </div>
                      </div>
                      <Link to="/carts">
                        <button
                          type="button"
                          className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5 " />
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {items.length > 0 && (
                        <span className="inline-flex items-center rounded-md mb-7 -ml-2 bg-red-50 px-2 py-0 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          {items.length}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Link to={item.Link}>
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            to={item.Link}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                          >
                            {item.name}
                          </Disclosure.Button>
                        </Link>
                      ))}
                      <input
                        type="text"
                        onChange={handleSearch}
                        id="searchInput"
                        class="border rounded pl-2 mr-5 mt-5 p-2 w-full mb-4"
                        placeholder="Search products..."
                      />
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                E-commerce
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      ) : (
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Link to="/">
                          <img
                            className="h-8 w-8"
                            src="https://cdn-icons-png.flaticon.com/512/1069/1069709.png"
                            alt="Your Company"
                          />
                        </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {NonUserNavigation.map((item) =>
                           
                              <Link
                                key={item.name}
                                to={item.Link}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            ) }
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <input
                          type="text"
                          onChange={handleSearch}
                          id="searchInput"
                          class="border rounded pl-2 mr-5 mt-5 p-2 w-full mb-4"
                          placeholder="Search products..."
                        />

                        <Link to="/carts">
                          <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                        {items.length > 0 && (
                          <span className="inline-flex items-center rounded-md mb-7 -ml-2 bg-red-50 px-2 py-0 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {items.length}
                          </span>
                        )}

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                // src={userInfo.imageUrl}
                                src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_people_person_avatar_white_tone_icon_159363.png"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {NonUserNavigationOptions.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.Link}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.Link} // Use the appropriate property for the link
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_people_person_avatar_white_tone_icon_159363.png"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                       
                        
                        
                      </div>
                      <Link to="/carts">
                        <button
                          type="button"
                          className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5 " />
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {items.length > 0 && (
                        <span className="inline-flex items-center rounded-md mb-7 -ml-2 bg-red-50 px-2 py-0 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          {items.length}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Link to={item.Link}>
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            to={item.Link}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                          >
                            {item.name}
                          </Disclosure.Button>
                        </Link>
                      ))}
                      <input
                        type="text"
                        onChange={handleSearch}
                        id="searchInput"
                        class="border rounded pl-2 mr-5 mt-5 p-2 w-full mb-4"
                        placeholder="Search products..."
                      />
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                E-commerce
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default Navbar;
