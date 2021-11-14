
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import FundraiserCard from './FundraiserCard'
import getWeb3 from "./utils/getWeb3";
import FactoryContract from "./contracts/FundraiserFactory.json";
import Web3 from 'web3'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));


const Home = () => {
  const [ contract, setContract] = useState(null)
  const [ accounts, setAccounts ] = useState(null)
  const [ funds, setFunds ] = useState([])
  //const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
  //const web3 = new Web3(new Web3.providers.HttpProvider('https://eth-rinkeby.alchemyapi.io/v2/N91qiFiblFtiuFNq-oXKDUDC6IepGSZe'))
  //const web3 = new Web3(window.ethereum)
  useEffect(() => {
    init()
  }, []);

  const init = async () => {
    try {
      //const networkId = await web3.eth.net.getId();
      //const deployedNetwork = FactoryContract.networks[networkId];
      //const accounts = await web3.eth.getAccounts();
      if (typeof window.ethereum !== 'undefined') {

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const web3 = new Web3(window.ethereum)
        
        const instance = new web3.eth.Contract(
          FactoryContract.abi,
          //deployedNetwork && deployedNetwork.address
          '0xd3Ae03556a13fD9820A3C9A0b0f6951288634665')

          setContract(instance)
          setAccounts(accounts)

          const funds = await instance.methods.fundraisers(10, 0).call()

          setFunds(funds)
        

      }
      

      
    }
    catch(error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  const displayFundraisers = () => {
    return funds.map((fundraiser) => {
      return (
        <FundraiserCard
          fundraiser={fundraiser}
          key={fundraiser}
        />
      )
    })
  }

  return (
    <div className="main-container">
      {displayFundraisers()}
    </div>
  )
}

export default Home;
