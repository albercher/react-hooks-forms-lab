import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";


function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [itemId, setId] = useState("")
  const [itemName, setName] = useState("");
  const [itemCategory, setCategory] = useState("Produce");
  const [itemData, setItemData] = useState([...items]); // most up to date version of our data


  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event){
    setSearch(event.target.value);
  }



  function handleNewNameChange(event){
    setName(event.target.value);
  };

  function handleNewCategoryChange(event){
    setCategory(event.target.value);
  };

  function handleSubmit(event) {
    setId(uuid);
    event.preventDefault();
    const formData = { id: itemId, name: itemName, category: itemCategory };
    const dataArray = [...itemData, formData];
    setItemData(dataArray);
    setName("");
    setCategory("Produce");

  }



  const itemsToDisplay = itemData.filter((item) => {
    if (selectedCategory === "All" && search === "") {
      return true;
    } else if (selectedCategory !== "All" && search === ""){
      return item.category === selectedCategory;
    } else if (selectedCategory === "All" && search !== ""){
      return item.name.toLowerCase().includes(search.toLowerCase());
    }
  });

  const listOfData = itemsToDisplay.map((item) => (
    <Item key={item.id} name={item.name} category={item.category} />
  ))



  return (
    <div className="ShoppingList">
      <ItemForm onNameChange={handleNewNameChange} onCategoryChange={handleNewCategoryChange}
      onItemFormSubmit={handleSubmit} />
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange}
      search={search} />
      <ul className="Items">
        {listOfData}
      </ul>
    </div>
  );
}

export default ShoppingList;
