import { useState } from 'react'
import './App.css'

function useInput ({ type, name, initialValue = '' }) {
  const [input, setInput] = useState(initialValue)
  const [error, setError] = useState('')
  const handleChange = (e) => {
    setInput(e.target.value)
  }

  return {
    input,
    handleChange,
    type,
    name,
    error,
    setError
  }
}

function App () {
  const ERROR_TYPES = Object.freeze({
    EMPTY_ERROR: 'This field is required',
    VALID_DAY: 'Must be a valid day',
    VALID_MONTH: 'Must be a valid month',
    VALID_YEAR: 'Must be a valid year',
    VALID_FULL_DATE: 'Must be a past date'

  })

  const THIS_DATE = new Date()
  const day = useInput({ type: 'number', name: 'day' })
  const month = useInput({ type: 'number', name: 'day' })
  const year = useInput({ type: 'number', name: 'day' })
  const [result, setResult] = useState({ years: null, months: null, days: null })
  const [errorDate, setErrorDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!day.input) {
      day.setError(ERROR_TYPES.EMPTY_ERROR)
    } else if (day.input <= 0 || day.input > 31) {
      day.setError(ERROR_TYPES.VALID_DAY)
    } else {
      day.setError('')
    }

    if (!month.input) {
      month.setError(ERROR_TYPES.EMPTY_ERROR)
    } else if (month.input > 12 || month.input <= 0) {
      month.setError(ERROR_TYPES.VALID_MONTH)
    } else {
      month.setError('')
    }
    if (!year.input) {
      year.setError(ERROR_TYPES.EMPTY_ERROR)
    } else if (year.input > THIS_DATE.getFullYear() || year.input <= 0) {
      year.setError(ERROR_TYPES.VALID_YEAR)
    } else {
      year.setError('')
    }

    if (!day.error && !month.error && !year.error) {
      const timeDiffms = THIS_DATE - new Date(year.input, month.input - 1, day.input)
      const timeDiffSince1970 = new Date(timeDiffms)
      if (timeDiffms < 0) {
        setErrorDate(ERROR_TYPES.VALID_FULL_DATE)
        return
      }
      setErrorDate('')
      const yearsDiff = timeDiffSince1970.getFullYear() - 1970
      const monthsDiff = timeDiffSince1970.getMonth()
      const daysDiff = timeDiffSince1970.getDate()
      setResult({ years: yearsDiff, months: monthsDiff, days: daysDiff })
    }
  }

  return (
    <div className='app'>
      <div className='ac-app-body'>
        <form onSubmit={handleSubmit} className='ac-inputs-body'>
          <div className='ac-input'>
            <label className={`${day.error ? 'error-color' : ''}`}>day</label>
            <input
              className={`${day.error ? 'error-color' : ''}`}
              type={day.type}
              onChange={day.handleChange}
              name={day.name}
              value={day.input}
            />
            {day.error && <p className='error-message'>{day.error}</p>}
          </div>
          <div className='ac-input'>
            <label className={`${month.error ? 'error-color' : ''}`}>month</label>
            <input
              className={`${month.error ? 'error-color' : ''}`}
              type={month.type}
              name={month.name}
              value={month.input}
              onChange={month.handleChange}
            />
            {month.error && <p className='error-message'>{month.error}</p>}
          </div>
          <div className='ac-input'>
            <label className={`${year.error ? 'error-color' : ''}`}>year</label>
            <input
              className={`${year.error ? 'error-color' : ''}`}
              type={year.name}
              name={year.name}
              value={year.input}
              onChange={year.handleChange}
            />
            {year.error && <p className='error-message'>{year.error}</p>}
          </div>

          <input type='image' className='ac-input-button' src='./arrow.png' alt='' />
        </form>
        {errorDate && <p className='error-message'>{errorDate}</p>}
        <div className='ac-results-body'>
          <div className='ac-result'>
            <span className='ac-result-value'>{result.years === null ? '--' : result.years}</span>
            <label className='ac-result-label'>years</label>
          </div>
          <div className='ac-result'>
            <span className='ac-result-value'>{result.months === null ? '--' : result.months}</span>
            <label className='ac-result-label'>months</label>
          </div>
          <div className='ac-result'>
            <span className='ac-result-value'>{result.days === null ? '--' : result.days}</span>
            <label className='ac-result-label'>days</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
