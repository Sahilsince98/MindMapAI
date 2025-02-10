import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface OnboardingData {
  fullName: string;
  age: number;
  gender: string;
  grade: string;
  schoolName: string;
  city: string;
  country: string;
  preferredLanguage: string;
  favoriteSubjects: string[];
  extracurricularActivities: string[];
  hobbies: string;
  roleModel: string;
  favoriteColor: string;
  favoriteFood: string;
  favoriteEntertainment: string;
  musicPreference: string;
}

export const OnboardingForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    fullName: '',
    age: 0,
    gender: '',
    grade: '',
    schoolName: '',
    city: '',
    country: '',
    preferredLanguage: '',
    favoriteSubjects: [],
    extracurricularActivities: [],
    hobbies: '',
    roleModel: '',
    favoriteColor: '',
    favoriteFood: '',
    favoriteEntertainment: '',
    musicPreference: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('student_profiles')
        .insert([
          {
            user_id: user.id,
            ...formData,
          },
        ]);

      if (error) throw error;
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8"
    >
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Let's Get to Know You Better!</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
            >
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              {/* Basic info fields */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                />
                {/* Add other basic info fields */}
              </div>
            </motion.div>
          )}

          {/* Add more steps as needed */}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Complete
              </button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};