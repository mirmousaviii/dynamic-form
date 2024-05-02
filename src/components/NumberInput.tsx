import React from 'react';
import { TextInput } from 'react-native';

type NumberInputProps = {
    value: string | number | boolean;
    onChange: (value: string) => void;
    placeholder?: string;
};

const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, placeholder }) => {
    return (
        <TextInput
            placeholder={placeholder}
            keyboardType="numeric"
            onChangeText={(text) => onChange(text)}
            value={value ? value.toString() : ''} // Convert value to string if it exists
        />
    );
};

export default NumberInput;