import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container,Flex,Button,Card, CardBody, Heading,Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useMediaQuery } from 'react-responsive';

import StationaryCombustion from '@/components/StationaryCombustion';
import PurchasedElectricity from '@/components/PurchasedElectricity';
import DailyCommutes from '@/components/DailyCommutes';
import Holidays from '@/components/Holidays';
import { calculateCarbon } from '@/CalculateCarbon';

ChartJS.register(ArcElement, Tooltip, Legend);

const Calculator = () => {

    const isLargeScreen = useMediaQuery({ minWidth: 800 });

    const router = useRouter();
    const { prop } = router.query;

    const hasStationaryCombustion = prop?.includes('stationary_combustion');
    const hasPurchasedElectricity = prop?.includes('purchased_electricity');
    const hasDailyCommutes = prop?.includes('daily_commutes');
    const hasHolidays = prop?.includes('holidays');

    const [combustionValue, setCombustionValue] = useState({});
    const [electricityValue, setElectricityValue] = useState({});
    const [dailyCommutesValue, setDailyCommutesValue] = useState({});
    const [holidaysValue, setHolidaysValue] = useState({});
    const [question,setQuestion] = useState(true);
    const [response,setResponse] = useState({stationaryCombustionCO2:"",purchasedElectricityCo2:"",dailyCommutesCO2:"",holidaysCO2:""});

    const handleStationaryCombustion = (inputValues: any) => {
        setCombustionValue(inputValues);
    };

    const handlePurchasedElectricity = (inputValues: any) => {
        setElectricityValue(inputValues);
    };

    const handleDailyCommutes = (inputValues: any) => {
        setDailyCommutesValue(inputValues);
    }

    const handleHolidays = (inputValues: any) => {
        setHolidaysValue(inputValues);
    }

    const submitHandler = (e:any) =>{
        e.preventDefault();
        setQuestion(false);
        const calculatorResponse = calculateCarbon(combustionValue, electricityValue, dailyCommutesValue, holidaysValue);
        setResponse(calculatorResponse);
    }

     const chartData = {
        labels:['Scope 1','Scope 2','Scope 3'],
        datasets:[
            {
            data:[parseFloat(response.stationaryCombustionCO2),parseFloat(response.purchasedElectricityCo2),parseFloat(response.dailyCommutesCO2)+parseFloat(response.holidaysCO2)],
            backgroundColor: ["rgb(59,163,166)","rgb(116,104,222)","rgb(249,155,46)"]
            }
        ]    
     }


    return (
     
        <Container centerContent>
            {question &&
                <Flex direction="column" align="stretch">
                    {hasStationaryCombustion && <StationaryCombustion onInputChange={handleStationaryCombustion} />}
                    {hasPurchasedElectricity && <PurchasedElectricity onInputChange={handlePurchasedElectricity}/>}
                    {hasDailyCommutes && <DailyCommutes onInputChange={handleDailyCommutes}/>}
                    {hasHolidays && <Holidays onInputChange={handleHolidays}/>}
                    
                    <Button 
                        rightIcon={<ArrowForwardIcon />} 
                        _hover={{ bg: '#b2f5ea' }}
                        bg="teal"
                        variant='solid' 
                        mt={4} 
                        onClick={submitHandler}
                        mx={3}
                    >
                        Next
                    </Button>
                </Flex>
            }
            {!question &&
                <Flex direction="column" align="stretch">
                    <Card mt={4} minWidth={isLargeScreen ? '500px' : '300'} >
                        <CardBody>
                            <Pie data={chartData} />
                            <Heading size="md" mb={2} mt={4}>Your Carbon Report</Heading>
                            <Text as="b">
                                Scope 1: 
                            </Text>
                            <Text>
                                Stationary Combusion: {response.stationaryCombustionCO2} KG CO2
                            </Text>
                            <Text as="b">
                                Scope 2:
                            </Text>
                            <Text>
                                Purchased Electricity: {response.purchasedElectricityCo2} KG CO2
                            </Text>
                            <Text as="b">
                                Scope 3:
                            </Text>
                            <Text>
                                Daily Commutes: {response.dailyCommutesCO2} KG CO2
                            </Text>
                            <Text>
                                Holidays: {response.holidaysCO2} KG CO2
                            </Text>
                            <Accordion allowToggle mt={4}>
                                <AccordionItem>
                                    <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                        Calculation Methodology
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                    1. Stationary Combustion values are taken from GHG Cross Sector Tools
                                    <br/>
                                    2. Grid Emission Factor is taken from Singapore EMA data
                                    <br/>
                                    3. Car (internal combustion and EV) emission factors are assumptions that the cars fall under Singapore LTA Band A2
                                    <br/>
                                    4. Train emission factor is taken from GHG Cross Sector Tools
                                    <br/>
                                    5. Bus emission factor is from Singpore SBS Sustainability report, assuming MAN A22 EURO 6 Diesel Bus
                                    <br/>
                                    6. Flight emission factor is following the IATA CO2 Connect methodology
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </CardBody>
                    </Card>
                    
                </Flex>
                
            }
        </Container>
    );
};

export default Calculator;