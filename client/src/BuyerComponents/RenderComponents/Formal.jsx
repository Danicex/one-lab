import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../StoreStyles.css'
import { useNavigate } from 'react-router-dom';

export default function Formal() {
  const [productData4, setProductData4 ] = useState([]);
  const  navigate =  useNavigate()

  useEffect(()=>{
    axios.get(`http://localhost:3000/products`,
      {params: {category:'formal_wear'} }
    )
    .then(res => {
      setProductData4(res.data.products)
    }).catch(err => {
      console.log(err)
    })
  },[])

  const handleView = (id) =>{
    navigate('/view_product', {state: {id}})
  }


  return (
    <div   className='store-layout'>
      <div className="store-data">
      {productData4.map((data)=>(
        <div className='product-card1' key={data.id} onClick={()=>handleView(data.id)}>
          <img src={data.image_url} alt="" className='product-image' />
          <div className="card-section">
            <h4>{data.name}</h4>
            <h5>{data.price}</h5><span>{data.currency}</span>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}
