import React from 'react';
import Select from 'react-select';

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
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ options, value, onChange, placeholder, isMulti = true }) => (
  <Select
    isMulti={isMulti}
    options={options}
    value={value}
    onChange={onChange}
    placeholder={placeholder || 'Filter...'}
    className="min-w-[200px]"
    classNamePrefix="react-select"
  />
);

export default FilterDropdown; 