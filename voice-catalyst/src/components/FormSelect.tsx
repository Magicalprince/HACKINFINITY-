import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  label: string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          className="form-input appearance-none"
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FormSelect; 