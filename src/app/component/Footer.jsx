import React from "react";
import {FaFacebookF,FaInstagram,FaLinkedinIn,FaYoutube,FaPhoneAlt,FaEnvelope,FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              ABC College
            </h2>
            <p className="text-sm leading-7">
              ABC College is committed to providing quality education,
              innovation, and career-focused learning to empower students for
              a successful future.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="hover:text-indigo-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/courses" className="hover:text-indigo-400 transition">
                  Courses
                </a>
              </li>
              <li>
                <a href="/faculty" className="hover:text-indigo-400 transition">
                  Faculty
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-indigo-400 transition">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/about-us" className="hover:text-indigo-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-indigo-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-indigo-400" />
                <p>
                  123 Education Street,
                  <br />
                  Pune, Maharashtra, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-indigo-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-400" />
                <span>info@abccollege.edu</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Follow Us
            </h3>
            <p className="text-sm mb-5">
              Stay connected with us on social media for the latest news,
              events, and announcements.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-indigo-600 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-red-600 transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>
            © {new Date().getFullYear()} ABC College. All Rights Reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-indigo-400">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-indigo-400">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;