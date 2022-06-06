import { React, useEffect, useState } from 'react'

const DonationView = ({
  getAccountClicked,
  sendTokenClicked,
  changeDonationValue
}) => {

  return (
    <div>
      <button type="button" onClick={getAccountClicked}>Connect Wallet</button>
      <div>
        <label>Donation Value (in USD)</label>
        <input onChange={e => changeDonationValue(e.target.value)} type="Number"></input>
      </div>
      <button type="button" onClick={sendTokenClicked}>Send Eth</button>
    </div>
  )
}

export default DonationView