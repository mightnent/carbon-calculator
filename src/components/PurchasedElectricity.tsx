import React, { useState,useEffect } from 'react';
import { Container,Stack, HStack, VStack,Card, CardBody, Heading, Text, Flex,Button,Input,FormControl,FormLabel, InputGroup,InputLeftAddon, InputRightAddon} from '@chakra-ui/react'

const PurchasedElectricity = ({ onInputChange }: { onInputChange: (inputValues: any) => void }) => {

  const [inputValues, setInputValues] = useState({
		electricity: "",
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

  return (
    <Container>
			<Flex direction="column" align="stretch">
				<Card mt={4}>
					<CardBody>
						<Heading size="md" mb={2}>Scope 2: Purchased Electricity</Heading>
						<Text>
						This is electricity purchased by you.
						<br/>
						<br/>
						For the values below, please give a monthly estimate. The system will automatically calculate the annual emissions based on the values given.
						</Text>

						<InputGroup size='md' mt={2}>
							<InputLeftAddon children='Electricity' />
							<Input
								type="text"
								value={inputValues.electricity}
								name='electricity'
								size="md"
								onChange={handleInputChange}
							/>
							<InputRightAddon children='kWh' />
						</InputGroup>
						
					</CardBody>
				</Card>
			</Flex>
		</Container>
  );
};

export default PurchasedElectricity;