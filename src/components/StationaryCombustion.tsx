import React, { useState,useEffect } from 'react';
import { Container,Stack, HStack, VStack,Card, CardBody, Heading, Text, Flex,Button,Input,FormControl,FormLabel, InputGroup,InputLeftAddon, InputRightAddon} from '@chakra-ui/react'

const StationaryCombustion = ({ onInputChange }: { onInputChange: (inputValues: any) => void }) => {

	const [inputValues, setInputValues] = useState({
		motor_gasoline: "",
		diesel_oil: "",
		// Add more input field values as needed
	});
	
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setInputValues((prevInputValues) => ({
			...prevInputValues,
			[name]: value,
		}));

	};

	useEffect(() => {
		// Call onInputChange whenever inputValues change
		onInputChange(inputValues);
	  }, [inputValues]);
	
	// Render the form with input fields
	return (
		<Container>
			<Flex direction="column" align="stretch">
				<Card mt={4}>
					<CardBody>
						<Heading size="md" mb={2}>Scope 1: Stationary Combustion</Heading>
						<Text>
						Stationary Combustion: This is direct greenhouse gas emissions occur from sources that are owned or controlled by the company/you.
						<br/>
						<br/>
						For the values below, please give a monthly estimate. The system will automatically calculate the annual emissions based on the values given.
						</Text>

						<InputGroup size='md' mt={2}>
							<InputLeftAddon children='Motor gasoline' />
							<Input
								type="text"
								value={inputValues.motor_gasoline}
								name='motor_gasoline'
								size="md"
								onChange={handleInputChange}
							/>
							<InputRightAddon children='Litre' />
						</InputGroup>
						<InputGroup size='md' mt={2}>
							<InputLeftAddon children='Gas/Diesel Oil' />
							<Input
								type="text"
								value={inputValues.diesel_oil}
								name='diesel_oil'
								size="md"
								onChange={handleInputChange}
							/>
							<InputRightAddon children='Litre' />
						</InputGroup>
					</CardBody>
				</Card>
			</Flex>
		</Container>
	
	
	);
}

export default StationaryCombustion;