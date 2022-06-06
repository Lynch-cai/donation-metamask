import { React, useState, useEffect } from 'react'
import DonationView from '../View/DonationView'

const DonationController = () => {
  // Get donation value
  const [donationValue, setDonationValue] = useState(0)

  const changeDonationValue = (value) => {
    setDonationValue(value)
    updateSendValue()
  }




  // Convert eth to donation value in USD
  const [ethValue, setEthValue] = useState(0)

  // Fetching eth current value
  useEffect(() => {
    fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
    .then((res) => res.json())
    .then((data)=>{
      setEthValue(data.USD)
    })
  }, [])

  // Updating send value
  const updateSendValue = () => {
    setTransactionParameters({
      from: transactionParameters.from,
      to: transactionParameters.to,
      value: ((donationValue/ethValue)*10000000000000000000).toString(16),
      gas: transactionParameters.gas,
    })
  }
  

  

  
  // Sending Ethereum to an address
  const [transactionParameters, setTransactionParameters] = useState({
    from: '',
    to: '0xE4Fd5d85252F5b72562bf7df180212c80109112b',
    value: '0x2386F26FC10000',
    gas: '0x2710',
  })

  // Declaring accounts
  const [accounts, setAccounts] = useState([])

  // Declaring Ethereum from metamask extension
  const { ethereum } = window

  // Send token
  const sendToken = () => {
    window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
  }

  // Update transaction parameters
  useEffect(() => {
    setTransactionParameters({
      from: accounts[0],
      to: transactionParameters.to,
      value: transactionParameters.value,
      gas: transactionParameters.gas,
    })
  }, [accounts])

  // Connect on user account
  async function getAccount() {
    setAccounts(await ethereum.request({ method: 'eth_requestAccounts' }))
  }

  return (
    <DonationView
      getAccountClicked={getAccount}
      sendTokenClicked={sendToken}
      changeDonationValue={(value) => changeDonationValue(value)}
    />
  )
}

export default DonationController