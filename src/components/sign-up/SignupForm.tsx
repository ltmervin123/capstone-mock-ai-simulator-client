import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { INPUT_CLASSES, LABEL_CLASSES, BUTTON_TOGGLE_CLASSES } from '../../constants/sharedClasses';
import PasswordToggle from '../../layouts/PasswordToggle';
import SuccessModal from '../../layouts/SuccessModal';

export default function SignupForm() {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowSuccessModal, setIsShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    studentId: '',
    program: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsShowSuccessModal(true);
  };

  const handlePasswordToggle = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleOnClose = () => {
    setIsShowSuccessModal(false);
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-12 font-inter sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="firstName" className={LABEL_CLASSES}>
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="Enter your first name"
                className={INPUT_CLASSES}
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="middleName" className={LABEL_CLASSES}>
                Middle Name
              </label>
              <input
                id="middleName"
                name="middleName"
                type="text"
                placeholder="Enter your middle name"
                className={INPUT_CLASSES}
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="lastName" className={LABEL_CLASSES}>
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Enter your last name"
                className={INPUT_CLASSES}
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="studentId" className={LABEL_CLASSES}>
                Student ID
              </label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                required
                placeholder="Enter your NMCI Student ID"
                className={INPUT_CLASSES}
                value={formData.studentId}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="program" className={LABEL_CLASSES}>
                Program
              </label>
              <input
                id="program"
                name="program"
                type="text"
                required
                placeholder="Enter your program section"
                className={INPUT_CLASSES}
                value={formData.program}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className={LABEL_CLASSES}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your @normi.edu.ph email"
                className={INPUT_CLASSES}
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="password" className={LABEL_CLASSES}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={isShowPassword ? 'text' : 'password'}
                  required
                  placeholder="Create a strong password"
                  className={INPUT_CLASSES}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  className={BUTTON_TOGGLE_CLASSES}
                >
                  <PasswordToggle isShowPassword={isShowPassword} />
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Choose a strong password (at least 8 characters, including letters and numbers)
              </p>
              <p className="text-mb mt-1 text-black">Make sure all information is correct.</p>
              <Link to="/login">
                <p className="text-mb mt-1 text-blue-400 hover:cursor-pointer hover:underline">
                  Have an account?
                </p>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <button
              type="submit"
              className="h-12 w-36 rounded-xl bg-green-700 font-inter text-2xl text-white transition-colors duration-300 hover:bg-green-800"
            >
              Sign up
            </button>
            <p className="mt-2 text-sm text-gray-600">
              Only 4th-year NORMI students are eligible for accounts
            </p>
          </div>
        </form>
      </div>
      {isShowSuccessModal && <SuccessModal onClose={handleOnClose} />}
    </div>
  );
}
