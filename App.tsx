import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Checkpoint = {
  type: 'string' | 'number' | 'boolean';
  name: string;
  values?: string[];
  placeholder?: string;
};

type Group = {
  name: string;
  checkpoints: Checkpoint[];
};

type FormData = {
  [key: string]: string | number | boolean;
};

export default  function App () {
  const [groups, setGroups] = useState<Group[]>([]);
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://dynamic-form.wiremockapi.cloud/api/v1/form');
      const data = await response.json();
      setGroups(data.groups);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (key: string, value: string | number | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    setFormData({});
    AsyncStorage.setItem('formData', JSON.stringify({}));
  };

  const handleReset = () => {
    setFormData({});
    AsyncStorage.setItem('formData', JSON.stringify({}));
  };

  return (
      <View>
        {groups.map((group, index) => (
            <View key={index}>
              <Text>{group.name}</Text>
              {group.checkpoints.map((checkpoint, idx) => (
                  <View key={idx}>
                    <Text>{checkpoint.name}</Text>
                    {checkpoint.type === 'string' && (
                        <TextInput
                            placeholder={checkpoint.placeholder}
                            onChangeText={(text) => handleChange(checkpoint.name, text)}
                            value={formData[checkpoint.name] as string}
                        />
                    )}
                    {checkpoint.type === 'number' && (
                        <TextInput
                            placeholder={checkpoint.placeholder}
                            keyboardType="numeric"
                            onChangeText={(text) => handleChange(checkpoint.name, text)}
                            value={formData[checkpoint.name] as string}
                        />
                    )}
                    {checkpoint.type === 'boolean' && (
                        <View>
                          {checkpoint.values?.map((value, i) => (
                              <TouchableOpacity
                                  key={i}
                                  onPress={() => handleChange(checkpoint.name, value === 'Yes')}
                              >
                                <Text>{value}</Text>
                              </TouchableOpacity>
                          ))}
                        </View>
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
