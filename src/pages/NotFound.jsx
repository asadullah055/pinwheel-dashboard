import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
          Page not found
        </p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950 md:text-5xl">
          404 Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded bg-[#1C2434] px-5 py-3 text-sm font-semibold text-white"
        >
          Go Dashboard
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
