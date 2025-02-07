import { Alert, Image } from "antd";
import React from "react";
import { MdNearbyError } from "react-icons/md";
import "../tailwind.css";

function Error() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-300">
        <div className="mb-8">
          <Image width={400} src="../Images/ErrorBroken.png" />
        </div>
        <div className="w-full max-w-md">
          <Alert
            className="p-8"
            message={
              <span className="text-2xl text-center flex justify-center font-semibold">
                Error 404
              </span>
            }
            description={
              <span className="text-l text-center flex justify-center text-black">
                Something Went Wrong!! Try Again Later!
              </span>
            }
            type="error"
            icon={<MdNearbyError className="text-xl" />}
          />
        </div>
      </div>
    </>
  );
}

export default Error;
