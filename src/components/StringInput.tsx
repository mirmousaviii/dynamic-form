import React from 'react';
import { TextInput, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type StringInputProps = {
    value: string | number | boolean;
    onChange: (value: string) => void;
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
};

const StringInput: React.FC<StringInputProps> = ({ value, onChange, placeholder, style }) => {
    return (
        <TextInput
            placeholder={placeholder}
            onChangeText={onChange}
            value={value ? value.toString() : ''}
            style={[styles.input, style]}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
    },
});

export default StringInput;
