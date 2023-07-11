import React, { useState,useEffect } from 'react';
import { Container, Card, CardBody, Heading, Text, Flex,Select } from '@chakra-ui/react'

import LeftRightAddonInput from './LeftRightAddonInput';

const Holidays = ({ onInputChange }: { onInputChange: (inputValues: any) => void }) => {
    
    const [inputValues, setInputValues] = useState({
        flightTime: "",
        craftType:"",
        cabinType:"",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setInputValues((prevInputValues) => ({
			...prevInputValues,
			[name]: value,
		}));

	};

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [name]: value,
        }));
      };

	useEffect(() => {
		// Call onInputChange whenever inputValues change
		onInputChange(inputValues);
	  }, [inputValues,onInputChange]);

    return (
        <Container>
			<Flex direction="column" align="stretch">
				<Card mt={4}>
					<CardBody>
						<Heading size="md" mb={2}>Scope 3: Holidays</Heading>
						<Text>
						Just flights for now
						<br/>
						<br/>
						For the values below, please give a annual estimate for flight time, cabin type and aircraft type.
						</Text>

						<LeftRightAddonInput
                        left="Flight Time"
                        right="Min"
                        value={inputValues.flightTime}
                        name="flightTime"
                        onChange={handleInputChange}
                        />
                        
                        <Select 
                            variant='filled' 
                            placeholder='Aircraft Type'
                            size='md'
                            name='craftType'
                            mt={2}
                            value={inputValues.craftType}
                            onChange={handleSelectChange}
                            isRequired
                        >
                            <option value='wide'>Wide Aircraft (2 aisle)</option>
                            <option value='narrow'>Narrow Aircraft (1 aisle)</option>
                        </Select>

                        <Select 
                            variant='filled' 
                            placeholder='Cabin Type'
                            size='md'
                            name='cabinType'
                            mt={2}
                            value={inputValues.cabinType}
                            onChange={handleSelectChange}
                            isRequired
                        >
                            <option value='economy'>Economy</option>
                            <option value='premiumEconomy'>Premium Economy</option>
                            <option value='business'>Business</option>
                            <option value='firstClass'>First Class</option>
                        </Select>

					</CardBody>
				</Card>
			</Flex>
		</Container>
    );
};

export default Holidays;
