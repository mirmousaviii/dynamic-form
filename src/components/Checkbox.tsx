import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type CheckboxProps = {
    value: boolean;
    onChange: (value: boolean) => void;
    options: string[];
};

const Checkbox: React.FC<CheckboxProps> = ({ value, onChange, options }) => {
    return (
        <React.Fragment>
            {options.map((option, index) => (
                <TouchableOpacity key={index} onPress={() => onChange(option === 'Yes')}>
                    <Text>{option}</Text>
                </TouchableOpacity>
            ))}
        </React.Fragment>
    );
};

export default Checkbox;
