import { NavaBar } from "../components/navBar";

const Dashboard = () => {
  return (
    <>
      <NavaBar />
      <div
        className=" min-h-screen bg-red-500  
      text-4xl
      flex items-center justify-center"
      >
        Hello DashBoard
      </div>
    </>
  );
};
export default Dashboard;
