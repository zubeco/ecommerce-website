import React from 'react'
import landingimg from '../../images/landingimg.jpg'
import Btn from '../btn/Btn'
import { Link } from "react-router-dom";
import './Sectionone.css'


const Sectionone = ({ products }) => {
    const linkStyle = {
        textDecoration: 'none',
        paddingLeft: '15px',
        paddingTop: '18px'
    }
    
    
    return (
        <div>
            <div className='sectionone-wrapper'>
                <img className='section-img' src={landingimg} alt="jj"/>
                <div className="wrap-items">
                    <h2>Summer Sales Live Now...</h2>
                    <p>Up to 30% Discount On Every Product</p>
                    <Link to='/products'> <Btn /></Link>
                </div>
            </div>
            <div className='section-grid'>
                {products.slice(0,3).map(product =>{
                        return(
                            <div className='section-wrap'>
                                <div >
                                    <img className='loggoo'  src={product.media.source} alt=""/>
                                    <div className='under-logo'>
                                        <h1>Cora Sweat shirts</h1>
                                        <p>One of those slouchy, instantly comfortable sweaters that everyone needs.</p>
                                    </div>
                                    <Link style={linkStyle} to='/products' className='move-btn'><p>SHOP NOW</p></Link>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Sectionone
