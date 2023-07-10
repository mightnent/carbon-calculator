// CalculatorContext.js
import { createContext } from 'react';

export type CalculatorContextType = {
    calculatorContext:{
        StationaryCombustion: {
        petrol: number;
        lng: number;
        },
        PurchasedElectricty: {
        kwh: number;
        },
        DailyCommutes: {
        ice: number;
        ev: number;
        bus: number;
        train: number;
        cycle: number;
        walk: number;
        },
        Holidays: {
        flightTime: number;
        }
    },
    setCalculatorContext: (newContext: CalculatorContextType) => void;
  };

  const defaultContext: CalculatorContextType = {
    calculatorContext:{
        StationaryCombustion: {
        petrol: 0,
        lng: 0,
        },
        PurchasedElectricty: {
        kwh: 0,
        },
        DailyCommutes: {
        ice: 0,
        ev: 0,
        bus: 0,
        train: 0,
        cycle: 0,
        walk: 0,
        },
        Holidays: {
        flightTime: 0,
        },
    },
    setCalculatorContext: () => {},
  };

  export const CalculatorContext = createContext<CalculatorContextType>(defaultContext);
