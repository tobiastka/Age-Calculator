import { useState } from 'react'
import './App.css'

function App () {
  // const THIS_DATE = new Date()

  const [day, setDay] = useState('')

  function handlerClick () {

  }

  return (
    <div className='app'>
      <div className='ac-app-body'>
        <div className='ac-inputs-body'>
          <div className='ac-input'>
            <label>day</label>
            <input type='number' onChange={(e) => { setDay(e.target.value) }} value={day} />
          </div>
          <div className='ac-input'>
            <label>month</label>
            <input type='number' />
          </div>
          <div className='ac-input'>
            <label>year</label>
            <input type='number' />
          </div>
          <img onClick={handlerClick} className='ac-input-button' src='./arrow.png' alt='' />
        </div>
        <div className='ac-results-body'>
          <div className='ac-result'>
            <span className='ac-result-value'>--</span>
            <label className='ac-result-label'>years</label>
          </div>
          <div className='ac-result'>
            <span className='ac-result-value'>--</span>
            <label className='ac-result-label'>months</label>
          </div>
          <div className='ac-result'>
            <span className='ac-result-value'>--</span>
            <label className='ac-result-label'>days</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
