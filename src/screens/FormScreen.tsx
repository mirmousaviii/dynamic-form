import React, { useEffect, useState } from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { fetchFormData } from '../services/api';
import { getFormData, setFormData } from '../services/storage';
import NumberInput from '../components/NumberInput';
import StringInput from '../components/StringInput';
import RadioButton from "../components/RadioButton";

const FormScreen: React.FC = () => {
    const [title, setTitle] = useState('');
    const [groups, setGroups] = useState([]);
    const [formData, setFormData] = useState<Record<string, string | number | boolean>>({});

    useEffect(() => {
        fetchData();
        loadStoredFormData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetchFormData();
            setTitle(data.name);
            setGroups(data.groups);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const loadStoredFormData = async () => {
        const storedData = await getFormData();
        setFormData(storedData);
    };

    const handleChange = (key: string, value: string | number | boolean) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        setFormData({});
        persistFormData({});
    };

    const handleReset = () => {
        setFormData({});
        persistFormData({});
    };

    const persistFormData = (formData: any) => {
        setFormData(formData);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {groups.map((group: any, index: number) => (
                <View key={index}>
                    <Text style={styles.groupName}>{group.name}</Text>

                    {group.checkpoints.map((checkpoint: any, idx: number) => (
                        <View key={idx}>
                            <Text style={styles.checkpointName}>{checkpoint.name}</Text>
                            {checkpoint.type === 'string' && (
                                <StringInput
                                    placeholder={checkpoint.placeholder}
                                    onChange={(value) => handleChange(checkpoint.name, value)}
                                    value={formData[checkpoint.name] ?? ''}
                                    style={styles.input}
                                />
                            )}
                            {checkpoint.type === 'number' && (
                                <NumberInput
                                    placeholder={checkpoint.placeholder}
                                    onChange={(value) => handleChange(checkpoint.name, value)}
                                    value={formData[checkpoint.name] ?? ''}
                                    style={styles.input}
                                />
                            )}
                            {checkpoint.type === 'boolean' && (
                                <RadioButton
                                    options={checkpoint.values || []}
                                    onChange={(value) => handleChange(checkpoint.name, value)}
                                    value={formData[checkpoint.name] === true}
                                    style={styles.checkbox}
                                />
                            )}
                        </View>
                    ))}
                </View>
            ))}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    groupName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    checkpointName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
    },
    checkbox: {
        marginBottom: 5,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    resetButton: {
        backgroundColor: '#6c757d',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default FormScreen;
