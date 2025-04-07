import { FormControl, FormLabel, Select } from '@chakra-ui/react';

const SelectInput = ({
  children,
  options,
  isRequired = false,
  labelProps,
  optionProps,
  ...rest
}) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel htmlFor='input label' color='black' {...labelProps}>
        {children}
      </FormLabel>
      <Select
        as='select'
        labelColor='black'
        {...rest}
        border='2px solid'
        borderColor='#3d3d3d'
        borderRadius='0.8rem'
      >
        <option value='' style={optionProps}>
          Choose...
        </option>
        {options.map((optn, index) => (
          <option
            key={index}
            value={optn.value}
            label={optn.label || optn.value}
            style={optionProps}
          />
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
