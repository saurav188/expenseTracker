import { Button, Popover } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

export const NavaBar = () => {
  //popover for user button
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  const content = (
    <div
      className="bg-zinc-100
    w-[20vw] h-auto
    flex flex-col justify-center items-center 
    text-l font-semibold "
    >
      <p className="font-bold text-xl">User</p>
      <br />
      <Link to={"/profile"}>Profile</Link>
      <br />
      <hr />
      <Link to={"/logout"}>LogOut</Link>
    </div>
  );

  return (
    <>
      <nav
        className="bg-green-500 h-[7vh]
      flex flex-row justify-between items-center "
      >
        <div id="logo " className="text-xl ml-10">
          Money Tracker Logo
        </div>

        <div id="userDetail">
          Welcome
          <Popover
            content={content}
            trigger="click"
            onClick={handleClick}
            ClassName="border-0"
            placement="bottomRight"
          >
            <Button
              type="primary"
              className="rounded-full bg-green-400 ml-3 mr-10"
            >
              User
            </Button>
          </Popover>
        </div>
      </nav>
    </>
  );
};
