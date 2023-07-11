import React, { useState,useEffect } from 'react';
import { Container, Card, CardBody, Heading, Text, Flex } from '@chakra-ui/react'

import LeftRightAddonInput from './LeftRightAddonInput';

const DailyCommutes = ({ onInputChange }: { onInputChange: (inputValues: any) => void }) => {

    const [inputValues, setInputValues] = useState({
        ice: "",
        ev: "",
        bus:"",
        train:"",
        cycle:"",
        walk:"",
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
	console.log(inputValues)
    }, [inputValues,onInputChange]);

    return (
        <Container>
			<Flex direction="column" align="stretch">
				<Card mt={4}>
					<CardBody>
						<Heading size="md" mb={2}>Scope 3: Daily Commutes</Heading>
						<Text>
						Transportation not owned by you, eg, public transport.
						<br/>
						<br/>
						For the values below, please give a daily estimate for a work day. The system will automatically calculate the annual emissions (working days) based on the values given.
						</Text>

						
						<LeftRightAddonInput left='ICE Car' right='KM' value={inputValues.ice} name='ice' onChange={handleInputChange} />
						<LeftRightAddonInput
							left="EV Car"
							right="KM"
							value={inputValues.ev}
							name="ev"
							onChange={handleInputChange}
						/>

						<LeftRightAddonInput
							left="Bus"
							right="KM"
							value={inputValues.bus}
							name="bus"
							onChange={handleInputChange}
						/>

						<LeftRightAddonInput
							left="Train"
							right="KM"
							value={inputValues.train}
							name="train"
							onChange={handleInputChange}
						/>

						<LeftRightAddonInput
							left="Cycle"
							right="KM"
							value={inputValues.cycle}
							name="cycle"
							onChange={handleInputChange}
						/>

						<LeftRightAddonInput
							left="Walk"
							right="KM"
							value={inputValues.walk}
							name="walk"
							onChange={handleInputChange}
						/>

					</CardBody>
				</Card>
			</Flex>
		</Container>
    );
};

export default DailyCommutes;