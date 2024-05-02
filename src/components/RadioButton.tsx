import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type RadioButtonProps = {
    value: string | number | boolean;
    onChange: (value: string) => void;
    options: string[];
    style?: StyleProp<ViewStyle>;
};

const RadioButton: React.FC<RadioButtonProps> = ({ value, onChange, options, style }) => {
    return (
        <React.Fragment>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => onChange(option)}
                    style={[styles.radioButton, style]}
                >
                    <Text>{option}</Text>
                </TouchableOpacity>
            ))}
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    radioButton: {
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
});

export default RadioButton;