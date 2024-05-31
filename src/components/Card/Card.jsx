import React from 'react'
import "./Card.css"

function Card({item, selectedItem, setSelectedItem}) {
  return <button className={`list-group-item list-group-item-action ${(selectedItem && selectedItem?.id == item.id) && 'active'}`} onClick={()=> setSelectedItem(item)}>{item.title}</button>
}
{/* <th scope="col">{id}</th>
<th scope="col">{title}</th> */}

export default Card