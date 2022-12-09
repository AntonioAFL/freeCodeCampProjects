function checkCashRegister(price, cash, cid) {
    const Exchange = {
      'ONE HUNDRED': 100,
      'TWENTY': 20.00,
      'TEN': 10.00,
      'FIVE': 5.00,
      'ONE': 1.00,
      'QUARTER': 0.25,
      'DIME': 0.1,
      'NICKEL': 0.05,
      'PENNY': 0.01
    }
  
    let change = (cash - price)
    let totalExchange = cid.map((unit) => unit[1])
                           .reduce((a,b) => a+b).toFixed(2);
    
    let cashRegister = {status: "", change: []};
    let newCid = []
    
    
    if (change > totalExchange) {
      
      cashRegister.status = "INSUFFICIENT_FUNDS";
      return cashRegister;
    }
  
    else if (change == totalExchange) {
      cashRegister.status = "CLOSED";
      cashRegister.change = cid;
      return cashRegister;
    }
  
    else {
      cid.reverse()
      
      for(let cidArr of cid){
        
        let cidMoney = cidArr[1];
        let cidUnit = cidArr[0];
        let newExchange = 0;
        
        while( (cidMoney > 0) && (change >= Exchange[cidUnit]) ){
            
          cidMoney -= Exchange[cidUnit];
          newExchange += Exchange[cidUnit];
          change -= Exchange[cidUnit];
          change = change.toFixed(2);
          
        }
        
        if(newExchange > 0){
          newCid.push([cidUnit, newExchange])
        }
        
      }
      
  
      if(change > 0){
        cashRegister.status = "INSUFFICIENT_FUNDS";
        return cashRegister;
      }   
  
      
  
    }
    
    cashRegister.status = "OPEN";
    cashRegister.change = newCid;
  
    return cashRegister;
  }