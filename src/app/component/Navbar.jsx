"use client"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Faculty", href: "/faculty" },
  { name: "Gallery", href: "/gallery" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 bg-white shadow-md"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex h-20 items-center justify-between">

           
              <a href="/" className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="College Logo"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-xl font-bold text-indigo-700">
                   KumarTheStar
                  </h1>
                  {/* <p className="text-xs text-gray-500">
                    Learn • Grow • Succeed
                  </p> */}
                </div>
              </a>

              
              <div className="hidden md:flex items-center gap-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="relative font-medium text-gray-700 transition duration-300 hover:text-indigo-600 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all hover:after:w-full"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

            
              <div className="hidden md:block">
                <a
                  href="/admission"
                  className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                  Admission
                </a>
              </div>

             
              <div className="md:hidden">
                <DisclosureButton className="rounded-md p-2 text-gray-700 hover:bg-gray-100">
                  {open ? (
                    <XMarkIcon className="h-7 w-7" />
                  ) : (
                    <Bars3Icon className="h-7 w-7" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

      
          <DisclosurePanel className="md:hidden bg-white shadow-lg">
            <div className="space-y-2 px-5 py-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {item.name}
                </a>
              ))}

              <a
                href="/admission"
                className="mt-4 block rounded-lg bg-indigo-600 px-4 py-3 text-center font-semibold text-white"
              >
                Admission
              </a>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}