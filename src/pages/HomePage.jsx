import React from 'react'
import Header from '../components/Header'
import Mongo from '../components/Mongo'
import Rds from '../components/Rds'
import Vault from '../components/Vault'

export default function HomePage(){
    
    
    return(
        <>
        <Header/>
        <Mongo/>
        <Rds/>
        <Vault/>
        </>
    )
}