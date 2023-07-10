import React, { useState,useEffect } from 'react';
import { Container, Card, CardBody, Heading, Text, Flex,Input,InputGroup,InputLeftAddon, InputRightAddon } from '@chakra-ui/react'

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
    }, [inputValues]);

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

						<InputGroup size='md' mt={2}>
							<InputLeftAddon children='ICE Car' width={100}/>
							<Input
								type="text"
								value={inputValues.ice}
								name='ice'
								size="md"
								onChange={handleInputChange}
							/>
							<InputRightAddon children='KM' />
						</InputGroup>
						<InputGroup size='md' mt={2}>
							<InputLeftAddon children='EV Car' width={100}/>
							<Input
								type="text"
								value={inputValues.ev}
								name='ev'
								size="md"
								onChange={handleInputChange}
							/>
							<InputRightAddon children='KM' />
						</InputGroup>
                        <InputGroup size='md' mt={2}>
							<InputLeftAddon children='Bus' width={100}/>
							<Input
								type="text"
								value={inputValues.bus}
								name='bus'
								size="md"
								onChange={handleInputChange}
							/>
							<InputRightAddon children='KM' />
						</InputGroup>
                        <InputGroup size='md' mt={2}>
							<InputLeftAddon children='Train' width={100} />
							<Input
								type="text"
								value={inputValues.train}
								name='train'
								size="md"
								onChange={handleInputChange}
							/>
							<InputRightAddon children='KM' />
						</InputGroup>
                        <InputGroup size='md' mt={2}>
							<InputLeftAddon children='Cycle' width={100} />
							<Input
								type="text"
								value={inputValues.cycle}
								name='cycle'
								size="md"
								onChange={handleInputChange}
							/>
							<InputRightAddon children='KM' />
						</InputGroup>
                        <InputGroup size='md' mt={2}>
							<InputLeftAddon children='Walk' width={100} />
							<Input
								type="text"
								value={inputValues.walk}
								name='walk'
								size="md"
								onChange={handleInputChange}
							/>
							<InputRightAddon children='KM' />
						</InputGroup>
					</CardBody>
				</Card>
			</Flex>
		</Container>
    );
};

export default DailyCommutes;