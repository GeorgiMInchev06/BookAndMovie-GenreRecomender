"use client"
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth, db} from '@/app/firebase/config'
import { doc, setDoc } from 'firebase/firestore';

  const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Error states for individual fields
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const handleRegister = async () => {

      // Reset all error messages
      setFirstNameError('');
      setLastNameError('');
      setUsernameError('');
      setEmailError('');
      setPasswordError('');

      // Basic validation
      const namePattern = /^[A-Za-z]{2,}$/; // Only alphabet, at least 2 characters
      const usernamePattern = /^[A-Za-z0-9]{6,}$/; // Alphanumeric, at least 6 characters
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // Valid email with English-only letters
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      let isValid = true;

      // First and Last Name Validation
      if (!namePattern.test(firstName)) {
        setFirstNameError("Please enter a valid first name.");
        isValid = false;
      }

      if (!namePattern.test(lastName)) {
        setLastNameError("Please enter a valid last name.");
        isValid = false;
      }

      // Username Validation
      if (!usernamePattern.test(username)) {
        setUsernameError("Please enter a valid Username.");
        isValid = false;
      }

      // Email Validation
      if (!emailPattern.test(email)) {
        setEmailError("Please enter a valid email address.");
        isValid = false;
      }

      // Password Length Validation
      if (!passwordPattern.test(password)) {
        setPasswordError("Please enter a valid password.");
        isValid = false;
      }

      if (!isValid) return;

        try {
          const userCredential = await createUserWithEmailAndPassword(email, password);
          const user = userCredential.user;

          // Save additional data in Firestore
          await setDoc(doc(db, "users", user.uid), {
              firstName: firstName,
              lastName: lastName,
              username: username,
              email: email,
              createdAt: new Date()
          });
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
            setUsername('');
        } catch(e){
          console.error(e)
          setEmailError("Registration failed. Please try again.");
        }
    };
  
    return (
    <div className='min-h-screen flex items-center justify-center  bg-slate-800'>
        <div className='bg-inherit  p-10 rounded-2xl  shadow-2xl w-1/4'>
            <h1 className='text-white  text-4xl mb-5'>Create Account</h1>
            <div className="mb-4">
                    {firstNameError && <p className="text-red-500 mb-1">{firstNameError}</p>}
                    <Input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-48 h mb-4 bg-slate-700 rounded outline-none text-white text-1xl placeholder-slate-500"
                    />
                </div>
                <div className="mb-4">
                    {lastNameError && <p className="text-red-500 mb-1">{lastNameError}</p>}
                    <Input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-48 mb-5 bg-slate-700 rounded outline-none text-white text-1xl placeholder-slate-500"
                    />
                </div>
                <div className="mb-4">
                    {usernameError && <p className="text-red-500 mb-1">{usernameError}</p>}
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 mb-4 bg-slate-700 rounded outline-none text-white text-1xl placeholder-slate-500"
                    />
                </div>
                <div className="mb-4">
                    {emailError && <p className="text-red-500 mb-1">{emailError}</p>}
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mb-4 bg-slate-700 rounded outline-none text-white text-1xl placeholder-slate-500"
                    />
                </div>
                <div className="mb-4 relative">
                    {passwordError && <p className="text-red-500 mb-1">{passwordError}</p>}
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mb-4 bg-slate-700 rounded outline-none text-white text-1xl placeholder-slate-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <div className="text-gray-400 mt-2 mb-2">
                    <p>Password must include:</p>
                    <ul className="list-disc ml-4">
                        <li>At least 8 characters</li>
                        <li>One uppercase letter</li>
                        <li>One lowercase letter</li>
                        <li>One number</li>
                        <li>One special character (e.g., @$!%*?&)</li>
                    </ul>
                </div>

            <Button
            onClick={handleRegister}
            className="w-full p-3 bg-indigo-600 rounded text-white text-2xl hover:bg-indigo-500"
            >
                Register
            </Button>
            <p className='p-3 text-white text-base'>If you already have registration <Link href="/login" className='text-sky-500'>click here</Link></p>
        </div>
    </div>
  );
};

export default Register;