import React from 'react';
import Select, { StylesConfig } from 'react-select';

interface Option {
  value: string | number;
  label: string;
}

interface FilterDropdownProps {
  options: Option[];
  value: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
  isMulti?: boolean;
  className?: string;
}

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#f3f4f6' : '#fff',
    color: '#111',
    borderColor: '#d1d5db',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#fff',
    color: '#111',
    zIndex: 50,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#e0e7ef' : '#fff',
    color: state.isSelected ? '#fff' : '#111',
    cursor: 'pointer',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#111',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#2563eb',
    color: '#fff',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#fff',
    ':hover': { backgroundColor: '#1e40af', color: '#fff' },
  }),
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({ options, value, onChange, placeholder, isMulti = true, className }) => (
  <Select
    isMulti={isMulti}
    options={options}
    value={value}
    onChange={onChange}
    placeholder={placeholder || 'Filter...'}
    className={`min-w-[200px] ${className || ''}`}
    classNamePrefix="react-select"
    styles={customStyles}
  />
);

export default FilterDropdown; 