import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { registerUser } from '../fetchers/userFetcher';
import { useSetLoggedIn } from '../contexts/LoggedInContext';
import GoogleIcon from '@mui/icons-material/Google';
//import { FaGithub } from 'react-icons/fa';

const Register = () => {
  const [registerError, setRegisterError] = useState(null);
  const setIsLoggedIn = useSetLoggedIn();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async e => {
    const res = await registerUser(e.email, e.password, e.username);

    if (res instanceof Error) {
      setRegisterError(res.message);
    } else {
      setIsLoggedIn(true);
      navigate('/');
    }
  };

  const usernameFieldOptions = {
    required: 'Please enter a username',
    minLength: {
      message: 'Username must be at least 3 characters',
      value: 3,
    },
  };

  const emailFieldOptions = {
    required: 'Please enter an email',
    pattern: {
      message: 'Email format is not valid',
      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
  };

  const passwordFieldOptions = {
    required: 'Please enter a password',
    minLength: {
      value: 4,
      message: 'Password must be at least 4 characters',
    },
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-col items-center justify-center">
        <motion.div className="bg-inherit bg-opacity-80 px-20 pb-20 pt-10 rounded-md shadow-2xl w-[550px]">
          <h2 className="text-slate-800 text-3xl font-mynerve font-bold mb-4">
            Register
          </h2>
          {registerError && (
            <p className="text-red-500 font-mynerve text-lg font-semibold p-4 m-auto">
              {registerError}
            </p>
          )}
          <form
            className="flex flex-col"
            onSubmit={handleSubmit(handleRegister)}
          >
            <input
              className="
                focus:transform 
                focus:transition-all 
                focus:scale-110  
                focus:outline-slate-700 
                text-sm 
                font-mynerve
                shadow-xl 
                rounded-md 
                bg-inherit
                outline 
                outline-1
                outline-slate-400
                p-3 
              "
              {...register('username', usernameFieldOptions)}
              placeholder="Username"
              autoComplete="username"
            />
            {errors.username && (
              <p className="text-red-500 font-mynerve text-lg font-semibold p-4 m-auto">
                {errors.username.message}
              </p>
            )}
            <input
              className="
                focus:transform 
                focus:transition-all 
                focus:scale-110  
                focus:outline-slate-700 
                text-sm 
                shadow-xl 
                font-mynerve
                rounded-md 
                bg-inherit 
                outline 
                outline-1  
                outline-slate-400
                p-3
              "
              {...register('email', emailFieldOptions)}
              placeholder="Email"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 font-mynerve text-lg font-semibold p-4 m-auto">
                {errors.email.message}
              </p>
            )}
            <input
              className="
                focus:transform 
                focus:transition-all 
                focus:scale-110 
                focus:outline-slate-700 
                text-sm 
                shadow-xl 
                font-mynerve
                rounded-md 
                bg-inherit 
                outline 
                outline-1 
                outline-slate-400
                p-3 
              "
              {...register('password', passwordFieldOptions)}
              type="password"
              placeholder="Password"
              autoComplete="password"
            />
            {errors.password && (
              <p className="text-red-500 font-mynerve text-lg font-semibold p-4 m-auto">
                {errors.password.message}
              </p>
            )}
            <motion.button
              className="p-4 rounded-3xl bg-blue-600 bg-opacity-95 mt-4 text-white text-xl font-mynerve shadow-xl"
              initial={{ opacity: 0.6 }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              whileInView={{ opacity: 1 }}
            >
              Register
            </motion.button>
          </form>
          <div className="text-center mt-4">
            <div className="flex items-center">
              <div className="flex-grow border-b border-gray-400"></div>
              <div className="mx-4 font-mynerve text-gray-500">OR</div>
              <div className="flex-grow border-b border-gray-400"></div>
            </div>
            <div
              className="
                hover:transform 
                hover:transition-all 
                hover:scale-110 
                cursor-pointer 
                flex 
                items-center 
                justify-center 
                gap-2 border 
                border-1 
                border-slate-400 
                rounded-3xl 
                font-mynerve
                text-xl
                mt-4 
                p-3 
                shadow-xl
              "
            >
              
              <Link to="http://localhost:3000/api/auth/google"><GoogleIcon/></Link>
              <span>Continue with Google</span> 
            </div>
          </div>
        </motion.div>
        <motion.button
          className="text-slate-800 bg-inherit font-mynerve text-xl mt-8"
          initial={{ opacity: 0.6 }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.9 }}
          whileInView={{ opacity: 1 }}
        >
          <Link to="/login">Already have an account? Login here.</Link>
        </motion.button>
      </div>
    </div>
  );
};

export default Register;
