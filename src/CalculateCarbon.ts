export const calculateCarbon = (combustionValue: object,electricityValue: object,dailyCommutesValue: object,holidaysValue: object) => {
    
    //calculate combustion co2 
    let motorGasolineCO2 = 0;
    let diesel_oil = 0;
    
    if("motor_gasoline" in combustionValue){
        motorGasolineCO2 = 2.27 * parseFloat(combustionValue?.motor_gasoline as string)
    }
    if("diesel_oil" in combustionValue){
        diesel_oil = 2.27 * parseFloat(combustionValue?.diesel_oil as string)
    }
    const stationaryCombustionCO2:string = ((motorGasolineCO2 + diesel_oil)*12).toFixed(2);

    //calculate electricity co2
    let electricityCO2 = 0;

    if("electricity" in electricityValue){
        electricityCO2 = 0.4057 * parseFloat(electricityValue?.electricity as string) * 12
    }   

    const purchasedElectricityCo2:string = electricityCO2.toFixed(2);

    //calculate daily commutes co2
    let ice=0
    let ev=0
    let bus=0
    let train=0

    if("ice" in dailyCommutesValue){
        ice = 0.120 * parseFloat(dailyCommutesValue?.ice as string)
    }
    if("ev" in dailyCommutesValue){
        ev = 0.9 * parseFloat(dailyCommutesValue?.ev as string)
    }
    if("bus" in dailyCommutesValue){
        bus = 4.39 * parseFloat(dailyCommutesValue?.bus as string)/60
    }
    if("train" in dailyCommutesValue){
        train = 0.262724 * parseFloat(dailyCommutesValue?.train as string)
    }

    const dailyCommutesCO2:string = ((ice + ev + bus + train)*250).toFixed(2);

    //calculate holidays co2
    let perPaxCo2Emission = 0;
    if("flightTime" in holidaysValue && "craftType" in holidaysValue && "cabinType" in holidaysValue){
        //let totalPaxValue = 154;
        let cabinFactor = {
            economy:1,
            premiumEconomy:1.5,
            business:4,
            firstClass:5
        };
        let paxDistribution = {
            economy:144,
            premiumEconomy:0,
            business:10,
            firstClass:0
        };
        if(holidaysValue?.craftType as string ==="wide"){
            //Singapore airlines Boeing 777-300 Extended Range
            //totalPaxValue = 264;
            cabinFactor = {
                economy:1,
                premiumEconomy:1,
                business:1.5,
                firstClass:1.5
            }
            paxDistribution = {
                economy:184,
                premiumEconomy:28,
                business:48,
                firstClass:4
            }
        }
        //step 1c: flightTime * fuelburn/min(80 kg/min)
        const totalFuelBurnt = parseFloat(holidaysValue?.flightTime as string) * 80;
        //step 1d: total fuel burnt * emission factor (3.16 kg co2 / kg fuel)
        const totalCo2Emission = totalFuelBurnt * 3.16
        //step 2d: assume pax-cargo ratio
        const paxRatio = 0.9;
        //step 2e: total co2 emission * pax ratio
        const paxCo2Emission = totalCo2Emission * paxRatio;
        //step 3b: per pax emission
        perPaxCo2Emission = (cabinFactor[holidaysValue?.cabinType as keyof typeof cabinFactor] * paxCo2Emission)/(cabinFactor.economy*paxDistribution.economy+cabinFactor.premiumEconomy*paxDistribution.premiumEconomy+cabinFactor.business*paxDistribution.business+cabinFactor.firstClass*paxDistribution.firstClass);

    }

    const holidaysCO2:string = perPaxCo2Emission.toFixed(2);

    return({
        stationaryCombustionCO2,
        purchasedElectricityCo2,
        dailyCommutesCO2,
        holidaysCO2
    })

}
