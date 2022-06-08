import React, { useState , useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  const [dropdownSelect, setDropdownSelect] = useState("")

  const API = 'http://localhost:3001/pets'

  useEffect(() => {
    if (filters.type === "all") {
      fetch(API)
      .then(r => r.json())
      .then(pets => setPets(pets))
    } else {
      fetch(`http://localhost:3001/pets?type=${filters.type}`)
      .then(r => r.json())
      .then(pets => setPets(pets))
    }
  },[filters.type]);

  function handleCategoryChange(e) {
    setDropdownSelect(e.target.value)
  }
  
  function handleFindPets() {
    setFilters({type: dropdownSelect })
  }

  function handleAdopt(petId) {
    console.log(petId)
    const foundPet = pets.find(pet => pet.id === petId)
    const index = pets.indexOf(foundPet)
    foundPet.isAdopted = true
    const updatedList = pets
    updatedList[index] = foundPet
    setPets(updatedList)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleCategoryChange} onFindPetsClick={handleFindPets}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdopt}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
