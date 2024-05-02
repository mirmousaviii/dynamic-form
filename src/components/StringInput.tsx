import React from 'react';
import { TextInput } from 'react-native';

type StringInputProps = {
    value: string | number | boolean;
    onChange: (value: string) => void;
    placeholder?: string;
};

const StringInput: React.FC<StringInputProps> = ({ value, onChange, placeholder }) => {
    return (
        <TextInput
            placeholder={placeholder}
            onChangeText={onChange}
            value={value ? value.toString() : ''} // Convert value to string if it exists
        />
    );
};

export default StringInput;