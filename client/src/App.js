
import React, { useState, useEffect } from "react";
import FactoryContract from "./contracts/FundraiserFactory.json";
import getWeb3 from "./utils/getWeb3";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import NewFundraiser from './NewFundraiser'
import Home from './Home'
import Receipts from './Receipts'
import Web3 from "web3"

import "./App.css";

const App = () => {
  const [state, setState] = useState({accounts: null, contract: null});

  useEffect(() => {
    const init = async() => {
      try {
        // Get network provider and web3 instance.
        //const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        //const accounts = await web3.eth.getAccounts();


        // Get the contract instance.
        //const networkId = await web3.eth.net.getId();
        //const deployedNetwork = FactoryContract.networks[networkId];


        if (typeof window.ethereum !== 'undefined') {

          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

          const web3 = new Web3(window.ethereum)
          
          const instance = new web3.eth.Contract(
            FactoryContract.abi,
            //deployedNetwork && deployedNetwork.address
            '0xd3Ae03556a13fD9820A3C9A0b0f6951288634665')

            setState({accounts, contract: instance});
          ;

        }

      } catch(error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    init();
  }, []);

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

  const runExample = async () => {
    const { accounts, contract } = state;
  };

  return (
    <div>
      <Router>
        <AppBar position="static" color="default" style={{ margin: 0 }}>
          <Toolbar>
           <Typography variant="h6" color="inherit">
             <NavLink className="nav-link" to="/">Home</NavLink>
           </Typography>
           <NavLink className="nav-link" to="/new/">New</NavLink>
          </Toolbar>
       </AppBar>

        <Route path="/" exact component={Home} />
        <Route path="/new/" component={NewFundraiser} />
        <Route path="/receipts" component={Receipts} />
      </Router>
    </div>
  )
}


export default App;
