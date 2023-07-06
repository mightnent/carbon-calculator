import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { CardVariants } from '@/types';
import StationaryCombustion from '@/components/stationary-combustion';
import PurchasedElectricity from '@/components/purchased-electricity';
import DailyCommutes from '@/components/daily-commutes';
import Holidays from '@/components/holidays';
import { Container } from '@chakra-ui/react';


const Calculator = () => {

    const router = useRouter();
    const { prop } = router.query;
    console.log('router.query', router.query)

    const hasStationaryCombustion = prop?.includes('stationary_combustion');
    const hasPurchasedElectricity = prop?.includes('purchased_electricity');
    const hasDailyCommutes = prop?.includes('daily_commutes');
    const hasHolidays = prop?.includes('holidays');


    useEffect(() => {
        // Access and use the prop as needed
        console.log(prop);
      }, [prop]);

    return (
        <Container centerContent>
            {hasStationaryCombustion && <StationaryCombustion />}
            {hasPurchasedElectricity && <PurchasedElectricity />}
            {hasDailyCommutes && <DailyCommutes />}
            {hasHolidays && <Holidays />}
        </Container>
    );
};

export default Calculator;