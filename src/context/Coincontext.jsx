import { createContext, useEffect, useState } from "react";

export const Coincontext=createContext();
const CoincontextProvider=(props)=>{

    const [allCoin,setAllCoin]=useState([]);
    const [currency,setCurrency]=useState({
        name:"usd",
        symbol:"$"
    })

    const fetchAllCoin=async()=>{
        const options = {
            method: 'GET',
            
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoin(res))
            .catch(err => console.error(err));
    }
    useEffect(()=>{
        fetchAllCoin();
    },[currency])

    const contextValue={
        allCoin,currency,setCurrency
    }
    return (
        <Coincontext.Provider value={contextValue}>
            {props.children}
        </Coincontext.Provider>
    )
}
export default CoincontextProvider