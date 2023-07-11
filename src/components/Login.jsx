import React, { useState } from "react";
import { motion } from "framer-motion"
import { loginUser } from "../fetchers/userFetcher";
import GitHubButton from "./GitHubButton";

const Login = ({ onFormSwitch, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !pass) {
      setError('Email and password are required');
      return;
    }
    
    const res = await loginUser(email, pass, setError);

    if (res === true) {
      setIsLoggedIn(res);
    } else {
      setError(res);
    }
  };

  return(
    <div className="h-screen w-full p-10 mt-10">
      <div className="flex flex-col items-center justify-center p-10">
        <motion.div 
          className="bg-inherit bg-opacity-80 p-20 rounded-md shadow-2xl w-[550px]"
          initial={{ opacity:0 }}
          animate={{ opacity:1 }} 
        >
          <h2 className="text-slate-800 text-3xl font-bold mb-4">Login</h2>
          <form className="flex flex-col" onSubmit={handleLogin}>
            {/* <label className="text-slate-800 text-sm" htmlFor="email">email</label> */}
            <input 
              className="
                focus:transform 
                focus:transition-all 
                focus:scale-110 
                focus:outline-slate-700 
                text-sm 
                shadow-xl 
                rounded-md 
                bg-inherit 
                outline 
                outline-1 
                outline-slate-400
                p-3 
              " 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder="Email" 
              id="email" 
              name="email" 
              autoComplete="username" 
            />
            {/* <label className="text-slate-800 text-sm" htmlFor="password">password</label> */}
            <input 
              className="
                focus:transform 
                focus:transition-all 
                focus:scale-110 
                focus:outline-slate-700 
                text-sm 
                shadow-xl 
                rounded-md 
                bg-inherit 
                outline 
                outline-1 
                outline-slate-400
                p-3 
              " 
              value={pass} 
              onChange={(e) => setPass(e.target.value)} 
              type="password" 
              placeholder="Password" 
              id="password" 
              name="password" 
              autoComplete="current-password" 
            />
            {error && <p className="text-red-500 text-sm font-semibold p-4 m-auto">{error}</p>}
            <span className="hover:underline text-sm text-blue-700 cursor-pointer w-32">Forgot password?</span>
            <motion.button
              className="p-4 rounded-3xl bg-blue-600 bg-opacity-95 mt-4 text-white shadow-xl" 
              initial={{ opacity: 0.6 }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              whileInView={{ opacity: 1 }}
            >
              Login
            </motion.button>
          </form>
          <div className="text-center mt-4">
            <div className="flex items-center">
              <div className="flex-grow border-b border-gray-400"></div>
              <div className="mx-4 text-xs text-gray-500">OR</div>
              <div className="flex-grow border-b border-gray-400"></div>
            </div>
            <GitHubButton />
          </div>
        </motion.div>
      </div>
      <div className="flex items-center justify-center">
        <motion.button 
          className="text-slate-800 bg-inherit mt-4"
          initial={{ opacity: 0.6 }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.9 }}
          whileInView={{ opacity: 1 }}
          onClick={() => onFormSwitch('register')}
        >
          New to Fridge Wizard? Join now
        </motion.button>      
      </div>
    </div>
  )
};

export default Login;