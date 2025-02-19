import React from "react";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold text-center">Home</h1>
        <p className="text-center mt-5">
          Welcome to the home page. This is a protected route.
        </p>
      </div>
    </div>
  );
};

export default Home;
