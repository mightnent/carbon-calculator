import { useState,Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Container,Stack, HStack, VStack,Card, CardBody, Heading, Text, Flex,Button } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { CardVariants } from '@/types';
import React, { useRef } from "react";
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';

import Globe from '@/components/Globe';
import styles from '../styles/index.module.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter();

    const [cardVariants, setCardVariants] = useState<CardVariants>({
        stationary_combustion: 'elevated',
        purchased_electricity: 'elevated',
        daily_commutes: 'elevated',
        holidays: 'elevated'
    });
    

    const toggleVariant = (cardName:string) => {
    setCardVariants((cardVariants:CardVariants) => ({
        ...cardVariants,
        [cardName]: cardVariants[cardName as keyof typeof cardVariants] === 'elevated' ? 'filled' : 'elevated',
    }));
    };

    const getObjectString = (obj:CardVariants) => {
        const keys = Object.keys(obj);
        const filledKeys = keys.filter(key => obj[key as keyof typeof obj] === 'filled');
        return filledKeys.join(',');
      };

    const clickButton = (e:any) =>{
        e.preventDefault();
        const propString = getObjectString(cardVariants);
        if (propString !== '') {
            router.push(`/calculator?prop=${propString}`);
        }
    }

    return (
    <>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/carbon _favicon.png" />
        </Head>
        <main>
            
            <Container maxW='2xl' centerContent mt={10}>
                <Flex direction="column" align="stretch">
                <Text color={'white'}>
                    I&apos;m a simple GHG calculator for companies! Choose the categories that you want to disclose and I&apos;ll estimate your CO2 equivalent. I&apos;ll also group your emissions into Scope 1, 2, and 3 and generate a simple report &#x1F600;
                </Text>

                    <Card 
                        mt={4}
                        variant={cardVariants.stationary_combustion} 
                        onClick={() => toggleVariant('stationary_combustion')}
                        _hover={{ cursor: 'pointer' }}
                        bg={cardVariants.stationary_combustion === "filled" ? "#b2f5ea" : undefined}
                    >
                        <CardBody>
                            <Heading size="md" mb={2}>Scope 1: Stationary Combustion</Heading>
                            <Text>
                            Direct greenhouse gas emissions occur from sources that are owned or controlled by the company.
                            </Text>
                        </CardBody>
                    </Card>
                    <Card 
                        mt={4} 
                        variant={cardVariants.purchased_electricity} 
                        onClick={() => toggleVariant('purchased_electricity')}
                        _hover={{ cursor: 'pointer' }}
                        bg={cardVariants.purchased_electricity === "filled" ? "#b2f5ea" : undefined}
                    >
                        <CardBody>
                            <Heading size="md" mb={2}>Scope 2: Purchased Electricity</Heading>
                            <Text>
                            Electricity consumption
                            </Text>
                        </CardBody>
                    </Card>
                    <Card 
                        mt={4} 
                        variant={cardVariants.daily_commutes} 
                        onClick={() => toggleVariant('daily_commutes')}
                        _hover={{ cursor: 'pointer' }}
                        bg={cardVariants.daily_commutes === "filled" ? "#b2f5ea" : undefined}
                    >
                        <CardBody>
                            <Heading size="md" mb={2}>Scope 3: Daily commutes</Heading>
                            <Text>
                            Transportation not owned by you, eg, public transport.
                            </Text>
                        </CardBody>
                    </Card>
                    <Card 
                        mt={4} 
                        variant={cardVariants.holidays} 
                        onClick={() => toggleVariant('holidays')}
                        _hover={{ cursor: 'pointer' }}
                        bg={cardVariants.holidays === "filled" ? "#b2f5ea" : undefined}
                    >
                        <CardBody>
                            <Heading size="md" mb={2}>Scope 3: Holidays</Heading>
                            <Text>
                            Just flights for now...
                            </Text>
                        </CardBody>
                    </Card>
                    <Button 
                        rightIcon={<ArrowForwardIcon />} 
                        _hover={{ bg: '#b2f5ea' }}
                        bg="teal"
                        variant='solid' 
                        mt={4} 
                        onClick={clickButton}
                    >
                        Next
                    </Button>
                </Flex>
            </Container>

            <div className={styles.canvasContainer} style={{backgroundImage: "url('/universe.jpg')"}}>
                <Canvas camera={{ 
                        fov:90,
                        near: 1, 
                        far:20,
                        position: [0, 2, 7] 
                    }}>
                    <OrbitControls/>
                    <Suspense>
        
                        <Globe/>
                    </Suspense>
                </Canvas>
            </div>

        </main>
    </>
    )
}
