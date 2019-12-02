import React, { useState, useEffect } from 'react'
import '../css/Table.css'
import axios from 'axios'
import postgresImg from '../images/postgres.png'
import Moment from 'react-moment'


export default function Mongo(){

    const [rdsData, setrdsData] = useState([])
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
                console.log(resp.data) 
                setrdsData(resp.data.DBSnapshots.sort((a,b) => new Date (b.SnapshotCreateTime) - new Date(a.SnapshotCreateTime)))
            })
           
        }
        
        


    const toggler =()=>{
        setToggle(!toggle)
    }

    const renderData = () =>{
        if (toggle === true){
            return rdsData
            
        } 
        if (toggle === false){
            return rdsData.slice(0,3)
        }


    }
useEffect(()=>{
    getRds()
}, [])



    return(
    <>
    <div className = 'toggle'>
    <img className = 'logo' src = {postgresImg}/>
    <button className='show' onClick={toggler}>{toggle ? "Show Less" : "Show More"}</button>    
    </div>  
    <section className = 'columnRDS'>
            <p>Creation Time</p>
            <p>Environment</p>
            <p>Engine</p>
            <p>Availability Zone</p>
            <p>Status</p>
    </section>
        {renderData().map((m,i)=> {
            return(
            <section key={i} className = 'dataRDS'>
            <div>
            <p key={i}>
                <Moment format="lll">
                {m.SnapshotCreateTime}
                </Moment>
                </p>
            </div>
            <div>
            <p key={i}>{m.DBSnapshotIdentifier.slice(4,25)}</p>
            </div>
            <div>
            <p key={i}>{m.Engine}</p>
            </div>
            <div>
            <p key={i}>{m.AvailabilityZone}</p>
            </div>
            {m.PercentProgress === 100
            ? <p key={i} className='complete'>COMPLETE</p> 
            : <p className='incomplete'>FAILED</p>
            }   
            </section>
            
            )
        })
        
        }
    </>
)

}