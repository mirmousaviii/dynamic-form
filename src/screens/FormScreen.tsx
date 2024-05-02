import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { fetchFormData } from '../services/api';
import { getFormData, setFormData } from '../services/storage';
import Checkbox from '../components/Checkbox';
import NumberInput from '../components/NumberInput';
import StringInput from '../components/StringInput';

const FormScreen: React.FC = () => {
    const [groups, setGroups] = useState([]);
    const [formData, setFormData] = useState<Record<string, string | number | boolean>>({});

    useEffect(() => {
        fetchData();
        loadStoredFormData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetchFormData();
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
        // Convert value to boolean if the checkpoint type is boolean
        const newValue = typeof value === 'string' ? value === 'Yes' : value;
        setFormData({ ...formData, [key]: newValue });
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
        <View>
            {groups.map((group: any, index: number) => (
                <View key={index}>
                    <Text>{group.name}</Text>
                    {group.checkpoints.map((checkpoint: any, idx: number) => (
                        <View key={idx}>
                            <Text>{checkpoint.name}</Text>
                            {checkpoint.type === 'string' && (
                                <StringInput
                                    placeholder={checkpoint.placeholder}
                                    onChange={(value) => handleChange(checkpoint.name, value)}
                                    value={formData[checkpoint.name] ?? ''}
                                />
                            )}
                            {checkpoint.type === 'number' && (
                                <NumberInput
                                    placeholder={checkpoint.placeholder}
                                    onChange={(value) => handleChange(checkpoint.name, value)}
                                    value={formData[checkpoint.name] ?? ''}
                                />
                            )}
                            {checkpoint.type === 'boolean' && (
                                <Checkbox
                                    options={checkpoint.values || []}
                                    onChange={(value) => handleChange(checkpoint.name, value)}
                                    value={formData[checkpoint.name] === true}
                                />
                            )}
                        </View>
                    ))}
                </View>
            ))}
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Reset" onPress={handleReset} />
        </View>
    );
};

export default FormScreen;
