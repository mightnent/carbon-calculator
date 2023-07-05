import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Container,Stack, HStack, VStack,Card, CardBody, Heading, Text, Flex } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {

    interface CardVariants {
        stationary_combustion: string;
        elec_consumption: string;
        daily_commutes: string;
        holidays: string;
      }

    const [cardVariants, setCardVariants] = useState<CardVariants>({
        stationary_combustion: 'elevated',
        elec_consumption: 'elevated',
        daily_commutes: 'elevated',
        holidays: 'elevated'
      });
    

      const toggleVariant = (cardName:string) => {
        setCardVariants((cardVariants:CardVariants) => ({
          ...cardVariants,
          [cardName]: cardVariants[cardName as keyof typeof cardVariants] === 'elevated' ? 'filled' : 'elevated',
        }));
      };

    return (
    <>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <Container maxW='2xl' centerContent mt={10}>
                <Flex direction="column" align="stretch">
                    <Text>
                        I'm a simple GHG calculator for companies! Choose the categories that you want to disclose and I'll estimate your CO2 equivalent. I'll also group your emissions into Scope 1, 2, and 3 and generate a simple report &#x1F600;
                    </Text>
                    <Card variant={cardVariants.stationary_combustion} onClick={() => toggleVariant('stationary_combustion')}>
                        
                        <CardBody>
                            <Heading size="md" mb={2}>Scope 1: Stationary Combustion</Heading>
                            <Text>
                            Direct greenhouse gas emissions occur from sources that are owned or controlled by the company.
                            </Text>
                        </CardBody>
                    </Card>
                    <Card mt={4} variant={cardVariants.elec_consumption} onClick={() => toggleVariant('elec_consumption')}>
                        
                        <CardBody>
                            <Heading size="md" mb={2}>Scope 2: Purchased Electricity</Heading>
                            <Text>
                            Electricity consumption
                            </Text>
                        </CardBody>
                    </Card>
                    <Card mt={4} variant={cardVariants.daily_commutes} onClick={() => toggleVariant('daily_commutes')}>
                        
                        <CardBody>
                            <Heading size="md" mb={2}>Scope 3: Daily commutes</Heading>
                            <Text>
                            Transportation not owned by you, eg, public transport.
                            </Text>
                        </CardBody>
                    </Card>
                    <Card mt={4} variant={cardVariants.holidays} onClick={() => toggleVariant('holidays')}>
                        
                        <CardBody>
                            <Heading size="md" mb={2}>Scope 3: Holidays</Heading>
                            <Text>
                            Just flights for now...
                            </Text>
                        </CardBody>
                    </Card>
                </Flex>
            </Container>

        </main>
    </>
    )
}
