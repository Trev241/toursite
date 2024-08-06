import { IoIosCheckmarkCircle } from "react-icons/io";

const StageMarker = ({ name, last, complete }) => {
  return (
    <>
      <div
        className={`flex items-center ${
          complete ? "text-green-600" : "text-gray-400"
        }`}
      >
        {complete && <IoIosCheckmarkCircle className="me-1 text-xl" />}
        <span>{name}</span>
      </div>
      {!last && <div class="mx-4 flex-grow border-t border-gray-400"></div>}
    </>
  );
};

export default StageMarker;
