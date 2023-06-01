import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry =  (name) => {
  const [country, setCountry] = useState('')
  
  useEffect(()=>{
    if(!name){
      return 
    }
    console.log('effect ran')
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/name/'+name)
    .then((response)=>{
console.log(response.data)
const country = {'data': {name:response.data.name.common, capital: response.data.capital[0], population:response.data.population, flag:response.data.flags.svg}, 'found': true}
setCountry(country)
  
    }).catch((e)=>{
      console.log("reaches error")
      const country = {'found': false}
      setCountry(country)
    })
     
    
}, [name])
console.log('last log before sending country', country)
return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App