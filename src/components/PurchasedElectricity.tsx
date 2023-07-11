import React, { useState,useEffect } from 'react';
import { Container,Card, CardBody, Heading, Text, Flex} from '@chakra-ui/react'

import LeftRightAddonInput from './LeftRightAddonInput';

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
	  }, [inputValues,onInputChange]);

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

						<LeftRightAddonInput
						left="Electricity"
						right="kWh"
						value={inputValues.electricity}
						name="electricity"
						onChange={handleInputChange}
						/>
						
					</CardBody>
				</Card>
			</Flex>
		</Container>
  );
};

export default PurchasedElectricity;