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
    grade: "",
    school: "",
    cityCountry: "",
    preferredLanguage: "",
    email: "",
    password: "",
    hobbies: "",
    interests: "",
    futureGoals: "",
  });
  console.log(userData)
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signUp(
        userData.name,
        userData.age,
        userData.gender,
        userData.grade,
        userData.school,
        userData.cityCountry,
        userData.preferredLanguage,
        userData.email,
        userData.password,
        userData.hobbies,
        userData.interests,
        userData.futureGoals
      );
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
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

        {/* <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-full border-2 border-green-200 focus:border-green-400 focus:outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-full border-2 border-green-200 focus:border-green-400 focus:outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-full border-2 border-green-200 focus:border-green-400 focus:outline-none"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-green-500 text-white py-3 rounded-full font-bold hover:bg-green-600 transition-colors"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </motion.button>
        </form> */}
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
            type="text"
            whileFocus={{ scale: 1.02 }}
            placeholder="Grade/Class"
            className="w-full px-4 py-3 rounded-full border-2 border-green-200"
            value={userData.grade}
            onChange={(e) =>
              setUserData({ ...userData, grade: e.target.value })
            }
            required
          />
          <motion.input
            type="text"
            whileFocus={{ scale: 1.02 }}
            placeholder="School Name"
            className="w-full px-4 py-3 rounded-full border-2 border-green-200"
            value={userData.school}
            onChange={(e) =>
              setUserData({ ...userData, school: e.target.value })
            }
            required
          />
          <motion.input
            type="text"
            whileFocus={{ scale: 1.02 }}
            placeholder="City & Country"
            className="w-full px-4 py-3 rounded-full border-2 border-green-200"
            value={userData.cityCountry}
            onChange={(e) =>
              setUserData({ ...userData, cityCountry: e.target.value })
            }
            required
          />
          <select
            className="w-full px-4 py-3 rounded-full border-2 border-green-200"
            value={userData.preferredLanguage}
            onChange={(e) =>
              setUserData({ ...userData, preferredLanguage: e.target.value })
            }
            required
          >
            <option value="">Preferred Language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Other">Other</option>
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
          <motion.input
            type="text"
            whileFocus={{ scale: 1.02 }}
            placeholder="Hobbies (Optional)"
            className="w-full px-4 py-3 rounded-full border-2 border-green-200"
            value={userData.hobbies}
            onChange={(e) =>
              setUserData({ ...userData, hobbies: e.target.value })
            }
          />
          <motion.input
            type="text"
            whileFocus={{ scale: 1.02 }}
            placeholder="Interests (Optional)"
            className="w-full px-4 py-3 rounded-full border-2 border-green-200"
            value={userData.interests}
            onChange={(e) =>
              setUserData({ ...userData, interests: e.target.value })
            }
          />
          <motion.input
            type="text"
            whileFocus={{ scale: 1.02 }}
            placeholder="Future Goals (Optional)"
            className="w-full px-4 py-3 rounded-full border-2 border-green-200"
            value={userData.futureGoals}
            onChange={(e) =>
              setUserData({ ...userData, futureGoals: e.target.value })
            }
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
