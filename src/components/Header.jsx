import React from 'react'
import aws from '../images/aws.jpg'
import mongo from '../images/mongo.jpg'
import postgres from '../images/postgres.png'
import exzeo from '../images/exzeo-logo.png'
import '../css/HomePage.css'




export default function Header(){


    return(
        <>
        <section className ='header'>
            <img className ='exzeo' src={exzeo}/>    
        <h1 className = 'title'>Backup Central</h1>
       
        </section>
        <div className = 'all-logos'>
        {/* <img className = 'logo' src={aws}/>
        <img className = 'logo' src={postgres}/>
        <img className = 'logo' src={mongo}/> */}
        </div>
        </>
    )
}