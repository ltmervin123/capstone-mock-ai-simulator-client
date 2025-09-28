import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../layouts/Modal';
import ProgramDropDown from './ProgramDropdown';
import useSignup from '../../hooks/sign-up/useSignup';
import InputField from '../ui/input-field';
import PasswordField from '../ui/password-field';
import Spinner from '../ui/spinner';
import PROGRAM_OPTIONS from '../../constants/program-option';
import { ErrorIcon, SuccessIcon } from '../ui/icon';

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
            <div className="w-[550px] animate-[scaleIn_0.3s_ease-in-out] rounded-lg bg-white p-8">
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
            <div className="w-[550px] animate-[scaleIn_0.3s_ease-in-out] rounded-lg bg-white p-8">
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
