import React, { useState, useEffect } from 'react'
import '../css/Mongo.css'
import axios from 'axios'
import postgresImg from '../images/postgres.png'
import Moment from 'react-moment'


export default function Mongo(){

    const [rdsData, setrdsData] = useState([])
    const [recentData, setrecentData] = useState([])
    const [filter, setFilter] = useState([])
    let [toggle, setToggle] = useState(false)
    const rdsURL = `http://localhost:8080/rds`
        
    const getRds=(e)=>{
            axios({method: 'GET', url: rdsURL})
            .catch(function (error) {
                if (error.response) {
                  // Request made and server responded
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
            
              })
            .then(resp=> {       
                    setrdsData(resp.data.DBSnapshots)
                    setrecentData(resp.data.DBSnapshots.slice(0,3))
            })
}

if (rdsData){
    rdsData.reverse()
}

const toggler =()=>{
    setToggle(!toggle)
}

    const renderData = () =>{
        if (toggle === true){
            return rdsData
            
        } 
        if (toggle === false){
            return recentData
        }


    }
useEffect(()=>{
    getRds()
}, [])



    return(
    <>
    <img className = 'logo' src = {postgresImg}/>
    <div className = 'toggle'>
    <button className='show' onClick={toggler}>{toggle ? "Show Less" : "Show More"}</button>    
    </div>  
    <section className = 'column'>
            <p>Creation Time</p>
            <p>Backup Job ID</p>
            <p>Engine</p>
            <p>Availability Zone</p>
            <p>Status</p>
    </section>
        {renderData().map((m,i)=> {
            return(
            <section key={i} className = 'data'>
            <div>
            <p key={i}>
                <Moment format="lll">
                {m.InstanceCreateTime}
                </Moment>
                </p>
            </div>
            <div>
            <p key={i}>{m.DbiResourceId.slice(3,15)}</p>
            </div>
            <div>
            <p key={i}>{m.Engine}</p>
            </div>
            <div>
            <p key={i}>{m.AvailabilityZone}</p>
            </div>
            {m.PercentProgress === 100
            ? <p key={i} className='complete'>COMPLETE</p> 
            : <p className='incomplete'>Failed</p>
            }   
            </section>
            
            )
        })
        
        }
    </>
)

}