import * as React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300 px-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800 mb-6">
          Welcome to BetterWellness
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Find professional counsellors and book your sessions easily!
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <Link
            to="/login"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
