import React from 'react';
import {Input,InputGroup,InputLeftAddon, InputRightAddon } from '@chakra-ui/react'

const LeftRightAddonInput: React.FC<{ left: string,right: string,value:string,name:string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ left, right, value,name, onChange }) => {
  return (
    <InputGroup size='md' mt={2}>
      <InputLeftAddon width={130}>
        {left}
      </InputLeftAddon>
      <Input
        type="text"
        value={value}
        name={name}
        size="md"
        onChange={onChange}
      />
      <InputRightAddon>
        {right}
      </InputRightAddon>
    </InputGroup>
  );
};

export default LeftRightAddonInput;
