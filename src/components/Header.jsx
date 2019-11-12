import React from 'react'
import aws from '../images/aws.jpg'
import mongo from '../images/mongo.jpg'
import postgres from '../images/postgres.png'
import css from '../css/HomePage.css'




export default function Header(){


    return(
        <>
        <section class='header'>    
        <h1 class = 'title'>Backup Central</h1>
        <img class = 'logo' src={aws}/>
        <img class = 'logo' src={mongo}/>
        <img class = 'logo' src={postgres}/>
        </section>
        </>
    )
}