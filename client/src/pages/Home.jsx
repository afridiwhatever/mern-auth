const Home = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-2xl py-12 px-4">
        <h1 className="font-bold text-3xl text-slate-800 mb-4">
          Welcome to my Auth App!
        </h1>

        <section>
          <p className="text-slate-700 mb-4 ">
            This is a full-stack web application built with the MERN (MongoDB,
            Express, React, Node.js) stack. It includes authentication features
            that allow users to sign up, log in, and log out, and provides
            access to protected routes only for authenticated users.
          </p>
          <p className="text-slate-700 mb-4 ">
            The front-end of the application is built with React and uses React
            Router for client-side routing. The back-end is built with Node.js
            and Express, and uses MongoDB as the database. Authentication is
            implemented using JSON Web Tokens (JWT).
          </p>
          <p className="text-slate-700 mb-4 ">
            This application is intended as a starting point for building
            full-stack web applications with authentication using the MERN
            stack. Feel free to use it as a template for your own projects!
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;
