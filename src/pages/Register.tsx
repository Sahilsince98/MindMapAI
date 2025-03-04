import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { AnimatedBalloons } from "../components/AnimatedBalloons";
import { UserPlus, Star } from "lucide-react";
export const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuthStore();
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await signUp(
        userData.name,
        userData.age,
        userData.gender,
        userData.email,
        userData.password
      );
      console.log("Response:", response);

      // if (response.status === 201) {
      if(response){
        navigate("/login");}
        else{
          alert("User already exist");
        }
      // } else {
      //   alert("User already exist");
      // }
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-100 to-pink-100 flex items-center justify-center p-4">
      <AnimatedBalloons />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 shadow-xl w-full max-w-md relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-green-500 text-white p-4 rounded-full mb-4"
          >
            <UserPlus size={32} />
          </motion.div>
          <h1 className="text-3xl font-bold text-green-600">Join the Fun!</h1>
          <p className="text-gray-600">Create your magical account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <motion.input
            type="text"
            whileFocus={{ scale: 1.02 }}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-full border-2 border-green-200"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            required
          />
          <motion.input
            type="number"
            whileFocus={{ scale: 1.02 }}
            placeholder="Age"
            className="w-full px-4 py-3 rounded-full border-2 border-green-200"
            value={userData.age}
            onChange={(e) => setUserData({ ...userData, age: e.target.value })}
            required
          />
          <select
            className="w-full px-4 py-3 rounded-full border-2 border-green-200"
            value={userData.gender}
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value })
            }
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer Not to Say">Prefer Not to Say</option>
          </select>

          <motion.input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-full border-2 border-green-200"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            required
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-full border-2 border-green-200"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            required
          />

          <motion.button
            className="w-full bg-green-500 text-white py-3 rounded-full font-bold"
            type="submit"
          >
            Create Account
          </motion.button>
        </form>
        <motion.div whileHover={{ scale: 1.05 }} className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-green-500 hover:text-green-600"
          >
            Already have an account? Let's play!
          </button>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
