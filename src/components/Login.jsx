import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useSetLoggedIn } from '../contexts/LoggedInContext';

import { loginUser } from '../fetchers/userFetcher';
import GitHubButton from './GitHubButton';
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';


const Login = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const setIsLoggedIn = useSetLoggedIn();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async e => {
    const res = await loginUser(e.email, e.password);

    if (!res.message) {
      // true means verified
      localStorage.setItem('email', e.email);
      setIsLoggedIn(true);
      navigate('/');
    } else {
      setLoginFailed(true);
    }
  };

  const googleOAuthClick = () => {
    axios.get('/api/auth/google')
  }

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
      <section className="flex flex-col items-center justify-center">
        <motion.div
          className="bg-inherit bg-opacity-80 px-20 pb-20 pt-10 rounded-md shadow-2xl w-[550px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-slate-800 text-3xl font-bold mb-4 font-mynerve">
            Login
          </h2>
          {loginFailed && (
            <p className="text-red-500 font-mynerve text-lg font-semibold p-4 m-auto">
              Incorrect email or password. Please try again.
            </p>
          )}
          <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
            <input
              {...register('email', emailFieldOptions)}
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
              font-mynerve
              shadow-xl 
              rounded-md 
              bg-inherit 
              outline 
              outline-1 
              outline-slate-400
              p-3 
              "
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              {...register('password', passwordFieldOptions)}
            />
            {errors.password && (
              <p className="text-red-500 font-mynerve text-lg font-semibold p-4 m-auto">
                {errors.password.message}
              </p>
            )}
            <span className="hover:underline text-blue-700 cursor-pointer font-mynerve w-32 pt-4 ">
              Forgot password?
            </span>
            <motion.button
              className="p-4 rounded-3xl bg-blue-600 bg-opacity-95 mt-4 text-white text-xl font-mynerve shadow-xl"
              initial={{ opacity: 0.6 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              whileInView={{ opacity: 1 }}
            >
              <input type="submit" />
            </motion.button>
          </form>
          <div className="text-center mt-4">
            <div className="flex items-center">
              <div className="flex-grow border-b border-gray-400"></div>
              <div className="mx-4 font-mynerve text-gray-500">OR</div>
              <div className="flex-grow border-b border-gray-400"></div>
            </div>
            
           <Link to="http://localhost:3000/api/auth/google"><GoogleIcon/></Link>
          </div>
        </motion.div>
      </section>
      <section>
        <Link to="/register" className="flex items-center justify-center">
          <motion.button
            className="text-slate-800 bg-inherit font-mynerve text-xl mt-8"
            initial={{ opacity: 0.6 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }}
          >
            New to Fridge Wizard? Join now
          </motion.button>
        </Link>
      </section>
    </div>
  );
};

export default Login;
