import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import All from './RenderComponents/All';
import logo from '../assets/417284f8-4190-4100-b644-290850ea0742.png';

import image1 from '../assets/4bac218a-83a7-46d9-963d-17024258ea91.png';
import image2 from '../assets/9c98bb56-348a-4d33-903b-aa1b994db63b.png';
import image3 from '../assets/654e431c-9e23-4860-81cc-5dc376c5d0c0.png';
import image4 from '../assets/77ff43ac-0df9-4a7b-b6f6-b1f78588f4e9.png';
import Business from './RenderComponents/Business';
import Casual from './RenderComponents/Casual';
import Formal from './RenderComponents/Formal';
import Luxury from './RenderComponents/Luxury';
import Native from './RenderComponents/NativeWear';
import Rear from './RenderComponents/Rear';
import Sportswear from './RenderComponents/Sportswear';
import Vintage from './RenderComponents/Vintage';
import '../SellerComponents/ProfileStyles.css';
import { IoIosLogOut } from "react-icons/io";
import axios from 'axios';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

export default function Store() {
  const [active, setActive] = useState(null);
  const [openNav, setOpenNav] = useState(false);
  const [query, setQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [noData, setNoData] = useState(false);

  const renderComponents = () => {
    switch (active) {
      case 'component': return <All />;
      case 'component1': return <Business />;
      case 'component2': return <Casual />;
      case 'component3': return <Formal />;
      case 'component4': return <Luxury />;
      case 'component5': return <Native />;
      case 'component6': return <Rear />;
      case 'component7': return <Sportswear />;
      case 'component8': return <Vintage />;
      default: return <All />;
    }
  };

  const handleOpenNav = () => {
    setOpenNav(!openNav);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:3000/products/`, {
        params: {
          q: query
        }
      });

      if (res.data.results.length > 0) {
        setSearchData(res.data.results);
        setNoData(false);
      } else {
        setSearchData([]);
        setNoData(true);
      }
      setSearched(true);
    } catch (error) {
      console.error("Error during search:", error);
      setSearchData([]);
      setSearched(false);
      setNoData(true);
    }
  };

  return (
    <div className='store-layout'>
      <div className="header">
        <img src={logo} alt="" className='logo2' />
        <div className="search">
          <input
            type="text"
            id='search-input'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='search...'
          />
          <button id='search-btn' onClick={handleSearch}>Search</button>
        </div>
        <CiMenuBurger onClick={handleOpenNav} id='icons' />
        {openNav && (
          <div className="navigationBar">
            <button className='close-nav-btn' onClick={handleOpenNav}>✖</button>
            <ul>
             <li> <Link to={'/update_user_profile'}>update profile</Link></li>
              <li><Link to={'/buyer_transaction'}>transaction</Link></li>
              <li>top list designers</li>
              <li>for you</li>
              <li>contact us</li>
            </ul>
            <Link to={'/logout_buyer'} className='btn-logout'> <IoIosLogOut className='icons1' /> </Link>
          </div>
        )}
      </div>

      <div className="slider">
        <Swiper
          className='swiper-container'
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
        >
          <SwiperSlide> <img src={image1} alt="" className='fit-image' /> </SwiperSlide>
          <SwiperSlide className='img-slide'>
            <img src={image2} alt="" className='fit-image' />
          </SwiperSlide>
          <SwiperSlide className='img-slide'>
            <img src={image3} alt="" className='fit-image' />
          </SwiperSlide>
          <SwiperSlide className='img-slide'>
            <img src={image4} alt="" className='fit-image' />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="categories">
        <p onClick={() => setActive('component')} className={`category-select ${active === 'component' ? 'active' : ''}`}>All</p>
        <p onClick={() => setActive('component1')} className={`category-select ${active === 'component1' ? 'active' : ''}`}>Business</p>
        <p onClick={() => setActive('component2')} className={`category-select ${active === 'component2' ? 'active' : ''}`}>Casual</p>
        <p onClick={() => setActive('component3')} className={`category-select ${active === 'component3' ? 'active' : ''}`}>Formal</p>
        <p onClick={() => setActive('component4')} className={`category-select ${active === 'component4' ? 'active' : ''}`}>Luxury</p>
        <p onClick={() => setActive('component5')} className={`category-select ${active === 'component5' ? 'active' : ''}`}>Native</p>
        <p onClick={() => setActive('component6')} className={`category-select ${active === 'component6' ? 'active' : ''}`}>Were</p>
        <p onClick={() => setActive('component7')} className={`category-select ${active === 'component7' ? 'active' : ''}`}>Sporty</p>
        <p onClick={() => setActive('component8')} className={`category-select ${active === 'component8' ? 'active' : ''}`}>Vintage</p>
      </div>

      <div className="product-data-wrap">
        {searched && noData && (
          <div className="404-response" style={{ textAlign: 'center', padding:'20px' }}>
            <p>No product of that kind found</p>
            <p style={{ color: 'red' }}>Try searching with another keyword</p>
          </div>
        )}

        {searched && !noData && searchData.length > 0 && (
          <div className='search-data'>
            {searchData.map((item) => (
              <div className="card-search-data" key={item.id}>
                <img src={item.image_url} alt="" />
                <h4>{item.name}</h4>
                <h3>{item.price}</h3>
              </div>
            ))}
          </div>
        )}

        {!searched && (
          <div>
            {renderComponents()}
          </div>
        )}
      </div>
    </div>
  );
}
