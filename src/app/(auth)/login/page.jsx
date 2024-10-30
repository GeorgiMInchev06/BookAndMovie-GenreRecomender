"use client"
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Show/hide password state
    const [emailError, setEmailError] = useState(""); // Email error state
    const [passwordError, setPasswordError] = useState(""); // Password error state

    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter()

    const handleLogin = async () => {
      setEmailError("");
      setPasswordError("");

      let isValid = true;

      // Validate email format
      if (!email) {
        setEmailError("Email is required.");
        isValid = false;
      }
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailPattern.test(email)) {
        setEmailError("Invalid email. Please enter a valid email address.");
        isValid = false;
      }
    
      // Validate password
      if (!password) {
        setPasswordError("Password is required.");
        isValid = false;
      }
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(password)) {
        setPasswordError("Invalid password. Please enter a valid password");
        isValid = false;
      }

      if (!isValid) return;

      try {
        const res = await signInWithEmailAndPassword(email, password)
        // Check if the login was successful
        if (res) {
          console.log({ res });
          // Reset input fields after successful login
          setEmail('');
          setPassword('');
          router.push("/home"); // Redirect to the homepage
        }     
      } catch(e){
          console.error(e)

          if (e.code === 'auth/wrong-password') {
            setPasswordError("Incorrect password. Please try again.");
          } 
          else if (e.code === 'auth/user-not-found') {
            setEmailError("No user found with that email. Please register.");
          } 
          else if (e.code === 'auth/invalid-email') {
            setEmailError("Invalid email format. Please check and try again.");
          } 
          else {
            setEmailError("Failed to log in. Please check your credentials and try again.");
          }
        }
    };
  
    return (
    <div className='min-h-screen flex items-center justify-center  bg-slate-800'>
        <div className='bg-inherit  p-10 rounded-2xl  shadow-2xl w-1/4'>
            <h1 className='text-white  text-4xl mb-5'>Welcome Back</h1>
            {emailError && <p className="text-red-500 mb-4">{emailError}</p>} {/* Email Error Message */}
            <Input
             type="email"
             placeholder="Email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="w-full p-3 mb-4 bg-slate-700 rounded outline-none text-white text-1xl placeholder-slate-500"            
            />
            {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>} {/* Password Error Message */}
            <div className="relative mb-4">
              <Input
                type={showPassword ? "text" : "password"} // Toggle between text and password type
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-slate-700 rounded outline-none text-white text-1xl placeholder-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle the show/hide state
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? "Hide" : "Show"} {/* Show or Hide text */}
              </button>
            </div>
            <Button
            onClick={handleLogin}
            className="w-full p-3 bg-indigo-600 rounded text-white text-2xl hover:bg-indigo-500"
            >
                Login
            </Button>
            <p className='p-3 text-white text-base'>
              If you don't have account, register <Link href="/register" className='text-sky-500'>here</Link>
            </p>
        </div>
    </div>
  );
};

export default Login;