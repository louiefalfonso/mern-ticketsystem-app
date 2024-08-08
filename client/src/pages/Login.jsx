import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../redux/slices/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

import { Toaster, toast } from "react-hot-toast";
import logo from "../assets/logo.png";
import background from "../assets/background.jpg";
import Textbox from "../components/common/Textbox";
import  Button from "../components/common/Button";

const Login = () => {

  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };
  useEffect(() => {
    user && navigate("/dashboard");
  }, [navigate, user]);
  
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-3/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14 rounded-md"
          >
            <div className="flex justify-center">
              <img src={logo} alt="logo" className="w-40" />
            </div>
            <div className="flex flex-col gap-y-5">
              <h4 className="text-center ">
                Cloud-Based Ticket System Platform{" "}
              </h4>
              <Textbox
                placeholder="Enter Email Address"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-md"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
                
              />
              <Textbox
                placeholder="Enter Password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-md"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
                
              />
              <Button
                type="submit"
                label="Submit"
                className="w-full h-10 bg-red-600 text-white rounded-full"
              />
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
