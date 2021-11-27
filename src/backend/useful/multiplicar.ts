export function multiplica (checkIn: Date, checkOut: Date, pricePerNight: number, taxaServico: number, taxaLimpeza: number): number {
  //multiplica (checkin, checkout, pricePerNight, taxaServico, taxaLimpeza)
    const day = 24 * 60 * 60 * 1000;
      
    const millsCheckIn = checkIn.getTime();
    const millsCheckOut   = checkOut.getTime();
  
    const difDatasEmMillis = millsCheckOut - millsCheckIn;
    const qtdDias = difDatasEmMillis / day;
  
    const calcTaxaServico = (taxaServico == 0) ? 0 : qtdDias * taxaServico;
    const calcTaxaLimpeza = (taxaLimpeza == 0) ? 0 : taxaLimpeza;
    const calcPricePerNight = pricePerNight * qtdDias;
  
    //pricePerNight * qtDias + qtdDias * taxaServiço + taxaLimpeza.
    return calcPricePerNight + calcTaxaLimpeza + calcTaxaServico; 
  };
