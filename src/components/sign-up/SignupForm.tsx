import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SuccessModal from '../../layouts/SuccessModal';
import ProgramDropDown from './ProgramDropdown';
import useSignup from '../../hooks/sign-up/useSignup';
import InputField from '../ui/input-field';
import PasswordField from '../ui/password-field';
import Spinner from '../ui/spinner';

const PROGRAM_OPTIONS = [
  'Bachelor of Science in Business Administration',
  'Bachelor of Science in Information Technology',
  'Bachelor of Science in Criminology',
  'Bachelor of Science in Hospitality Management',
  'Bachelor of Science in Education',
  'Bachelor of Elementary Education',
];

export default function SignupForm() {
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
  const navigate = useNavigate();
  const { errors, setErrors, isSubmitting, signUp } = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSetProgram = (value: string) => {
    setErrors((prev) => ({ ...prev, program: '' }));
    setFormData((prev) => ({
      ...prev,
      program: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signUp(formData);
    if (result.success) {
      setIsShowSuccessModal(true);
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        studentId: '',
        program: '',
        email: '',
        password: '',
      });
    }
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
            <InputField
              label={'First Name'}
              name={'firstName'}
              type={'text'}
              placeholder={'Enter your first name'}
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              disabled={isSubmitting}
            />

            <InputField
              label={'Middle Name'}
              name={'middleName'}
              type={'text'}
              placeholder={'Enter your middle name'}
              value={formData.middleName}
              onChange={handleChange}
              error={errors.middleName}
              disabled={isSubmitting}
            />

            <InputField
              label={'Last Name'}
              name={'lastName'}
              type={'text'}
              placeholder={'Enter your last name'}
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              disabled={isSubmitting}
            />

            <InputField
              label={'Student ID'}
              name={'studentId'}
              type={'text'}
              placeholder={'Enter your NMCI Student ID'}
              value={formData.studentId}
              onChange={handleChange}
              error={errors.studentId}
              maxLength={12}
              disabled={isSubmitting}
            />

            <div>
              <label
                htmlFor="program"
                className={`mb-1 block font-inter text-sm font-medium text-gray-700 ${errors.program ? 'text-red-500' : ''}`}
              >
                Program
              </label>

              <ProgramDropDown
                selectedOption={formData.program}
                setSelectedOption={handleSetProgram}
                options={PROGRAM_OPTIONS}
                error={errors.program}
                disabled={isSubmitting}
              />
              {errors.program && <p className="mt-1 text-sm text-red-500">{errors.program}</p>}
            </div>

            <InputField
              label={'Email'}
              name={'email'}
              type={'email'}
              placeholder={'Enter your @normi.edu.ph email'}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={isSubmitting}
            />

            <div className="md:col-span-2">
              <PasswordField
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
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
      {isShowSuccessModal && <SuccessModal onClose={handleOnClose} />}
    </div>
  );
}
