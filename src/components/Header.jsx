import React from 'react'
import exzeo from '../images/exzeo-logo.png'
import '../css/HomePage.css'




export default function Header(){


    return(
        <>
        <section className ='header'>
            <img className ='exzeo' src={exzeo} alt='company-logo'/>    
        <h1 className = 'title'>Backup Central</h1>
        </section>
        </>
    )
}