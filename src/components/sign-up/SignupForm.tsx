import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../layouts/Modal';
import ProgramDropDown from './ProgramDropdown';
import useSignup from '../../hooks/sign-up/useSignup';
import InputField from '../ui/input-field';
import PasswordField from '../ui/password-field';
import Spinner from '../ui/spinner';
import PROGRAM_OPTIONS from '../../constants/program-option';

const SuccessIcon = (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M45.0001 88.3332C50.6918 88.3402 56.3287 87.2226 61.5871 85.0444C66.8454 82.8662 71.6216 79.6705 75.6411 75.6409C79.6708 71.6213 82.8665 66.8452 85.0446 61.5868C87.2228 56.3284 88.3405 50.6915 88.3335 44.9999C88.3405 39.3082 87.2228 33.6713 85.0446 28.4129C82.8665 23.1546 79.6708 18.3784 75.6411 14.3589C71.6216 10.3292 66.8454 7.13351 61.5871 4.95535C56.3287 2.7772 50.6918 1.65952 45.0001 1.66654C39.3085 1.65952 33.6715 2.7772 28.4132 4.95535C23.1548 7.13351 18.3787 10.3292 14.3591 14.3589C10.3295 18.3784 7.13376 23.1546 4.9556 28.4129C2.77744 33.6713 1.65976 39.3082 1.66678 44.9999C1.65976 50.6915 2.77744 56.3284 4.9556 61.5868C7.13376 66.8452 10.3295 71.6213 14.3591 75.6409C18.3787 79.6705 23.1548 82.8662 28.4132 85.0444C33.6715 87.2226 39.3085 88.3402 45.0001 88.3332Z" />
    <path
      d="M27.6667 45L40.6667 58L66.6667 32"
      stroke="#0A7E32"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const ErrorIcon = (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="45" cy="45" r="43" stroke="#D32F2F" strokeWidth="4" fill="none" />
    <line x1="30" y1="30" x2="60" y2="60" stroke="#D32F2F" strokeWidth="5" strokeLinecap="round" />
    <line x1="60" y1="30" x2="30" y2="60" stroke="#D32F2F" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export default function SignupForm() {
  const [isShowSuccessModal, setIsShowSuccessModal] = useState(false);
  const [isShowErrorModal, setIsShowErrorModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    studentId: '',
    program: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { validationErrors, setValidationErrors, isSubmitting, signUp, responseError } =
    useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSetProgram = (value: string) => {
    setValidationErrors((prev) => ({ ...prev, program: '' }));
    setFormData((prev) => ({
      ...prev,
      program: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signUp(formData);

    if (!result.success && result.error === 'ValidationError') {
      return;
    }

    if (!result.success && result.error === 'RequestError') {
      setIsShowErrorModal(true);
      return;
    }

    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      studentId: '',
      program: '',
      email: '',
      password: '',
    });

    setIsShowSuccessModal(true);
  };

  const handleSuccessOnClose = () => {
    setIsShowSuccessModal(false);
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-12 font-inter sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              label={'First Name'}
              name={'firstName'}
              type={'text'}
              placeholder={'Enter your first name'}
              value={formData.firstName}
              onChange={handleChange}
              error={validationErrors.firstName}
              disabled={isSubmitting}
            />

            <InputField
              label={'Middle Name'}
              name={'middleName'}
              type={'text'}
              placeholder={'Enter your middle name'}
              value={formData.middleName}
              onChange={handleChange}
              error={validationErrors.middleName}
              disabled={isSubmitting}
            />

            <InputField
              label={'Last Name'}
              name={'lastName'}
              type={'text'}
              placeholder={'Enter your last name'}
              value={formData.lastName}
              onChange={handleChange}
              error={validationErrors.lastName}
              disabled={isSubmitting}
            />

            <InputField
              label={'Student ID'}
              name={'studentId'}
              type={'text'}
              placeholder={'Enter your NMCI Student ID'}
              value={formData.studentId}
              onChange={handleChange}
              error={validationErrors.studentId}
              maxLength={12}
              disabled={isSubmitting}
            />

            <div>
              <label
                htmlFor="program"
                className={`mb-1 block font-inter text-sm font-medium text-gray-700 ${validationErrors.program ? 'text-red-500' : ''}`}
              >
                Program
              </label>

              <ProgramDropDown
                selectedOption={formData.program}
                setSelectedOption={handleSetProgram}
                options={PROGRAM_OPTIONS}
                error={validationErrors.program}
                disabled={isSubmitting}
              />
              {validationErrors.program && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.program}</p>
              )}
            </div>

            <InputField
              label={'Email'}
              name={'email'}
              type={'email'}
              placeholder={'Enter your @normi.edu.ph email'}
              value={formData.email}
              onChange={handleChange}
              error={validationErrors.email}
              disabled={isSubmitting}
            />

            <div className="md:col-span-2">
              <PasswordField
                value={formData.password}
                onChange={handleChange}
                error={validationErrors.password}
                disabled={isSubmitting}
              />
            </div>
            <div className="md:col-span-2">
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
              className="h-12 w-36 rounded-xl bg-green-700 font-inter text-2xl text-white transition-colors duration-300 hover:bg-green-800 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : 'Sign up'}
            </button>
            <p className="mt-2 text-sm text-gray-600">
              Only 4th-year NORMI students are eligible for accounts
            </p>
          </div>
        </form>
      </div>
      {isShowSuccessModal && (
        <>
          <Modal>
            <div className="w-[550px] animate-[scaleIn_0.3s_ease-in-out] rounded-lg bg-white p-8 shadow-xl">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-600">
                  {SuccessIcon}
                </div>
                <p className="text-center text-gray-800">
                  Thanks for signing up! We've sent a verification link to the email address you
                  provided. Please check your inbox and click the link to verify your email and
                  register your account.
                </p>
                <button
                  onClick={handleSuccessOnClose}
                  className="mt-4 rounded-md bg-green-600 px-8 py-2 font-medium text-white hover:bg-green-700"
                >
                  Okay
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}

      {isShowErrorModal && (
        <>
          <Modal>
            <div className="w-[550px] animate-[scaleIn_0.3s_ease-in-out] rounded-lg bg-white p-8 shadow-xl">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-red-600">
                  {ErrorIcon}
                </div>
                <p className="text-center text-gray-800">{responseError?.message}</p>
                <button
                  onClick={() => setIsShowErrorModal(false)}
                  className="mt-4 rounded-md bg-green-600 px-8 py-2 font-medium text-white hover:bg-green-700"
                >
                  Okay
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}
