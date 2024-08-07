import { Button, Input } from "antd";
import Form from "antd/es/form/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/user/login/",
        values
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard");
      console.log("successfully loggedIn");
    } catch (error) {
      console.log("Failed To LogIn");
    }
  };

  return (
    <>
      <div className="bg-blue-300 p-10 h-[100vh] flex flex-col ">
        <div className="  bg-red-400 p-[0px] mt-[10vh] ml-[20%] w-[50vw] rounded-xl flex flex-col justify-center items-center float-right">
          <div>
            <br />
            <h2 className="align">LogIn</h2>
          </div>
          <div className="">
            <br />
            <br />
            <Form
              className=" "
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="default" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="pl-10">
            Dont Have an Account? <br />
            <Link to={"/signup"}>Create New Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
