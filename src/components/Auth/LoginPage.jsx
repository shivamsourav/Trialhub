import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import {
  FaUserTie,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://trialhub-backend.onrender.com/api/v1/login",
        formData
      );
      console.log(res);
  
      if (res.data.Login === "Succesful") {
        const userData = {
          userId: res.data.UserData._id,
          clientId: res.data.UserData.clientId
        };
        console.log(userData);
        localStorage.setItem("userData", JSON.stringify(userData));

        router.push('/dashboard');
      } else {
        alert(res.data.Comment)
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <Head>
          <title>Login - Trialhub</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center flex-1 w-full h-screen text-center sm:p-20 ">
          <div className="flex max-w-4xl bg-white shadow-2xl w-7/8 lg:w-2/3 rounded-2xl sm:shrink-0">
            <div className="flex flex-col w-full px-6 py-2 md:w-1/2 md:p-16 ">
              <div className="font-bold text-left">
                <span className="text-orange-400">Trial</span>
                Hub
              </div>
              <div className="py-10">
                <h2 className="mb-6 text-2xl font-bold">SignIn to Account</h2>

                <form onSubmit={handleSubmit}  className="flex flex-col gap-4 items-center mb-3">
                  <div className="flex items-center w-64 p-2 bg-gray-100 ">
                    <FaUserTie className="text=gray-300 mr-2" />
                    <input
                      className="flex-1 text-sm bg-gray-100 outline-none "
                      type="email"
                      name="email"
                      placeholder="Email ID"
                      onChange={handleChange}
                      value={formData.email}
                      required
                    />
                  </div>
               
                  <div className="flex items-center w-64 p-2 bg-gray-100 ">
                    <MdLockOutline className="text=gray-300 mr-2" />
                    <input
                      className="text-sm bg-gray-100 outline-none "
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={formData.password}
                      required
                    />
                  </div>

                  <div className="flex justify-between w-64 mb-5">
                    <label className="flex items-center text-xs">
                      <input type="checkbox" name="remember" className="mr-1" />
                      Remember Me{" "}
                    </label>
                    <a href="#" className="text-sm">
                      Forget PassWord?
                    </a>
                  </div>
                  <button
                    type="submit"
                    // href="/dashboard"
                    className="inline-block px-12 py-1.5 font-semibold border-2 rounded-full border-orange hover:bg-orange-300 hover:text-black-400"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
            <div className="hidden w-full p-6 bg-orange-200 md:p-8 md:w-1/2 lg:p-32 md:block rounded-2xl">
              <h2 className="mb-2 text-3xl font-bold">Hello, User!</h2>
              <div className="inline-block w-10 mb-2 border-2 border-white"></div>
              <p className="mb-10">
                Fill up personal information and start journey with us.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
