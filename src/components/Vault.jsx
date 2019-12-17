import React, { useState, useEffect } from 'react'
import '../css/Table.css'
import axios from 'axios'
import awsImg from '../images/aws.jpg'
import Moment from 'react-moment'


export default function Vault(){

    const [vaultData, setvaultData] = useState([])
    let [toggle, setToggle] = useState(false)
    const vaultURL = `http://localhost:8080/vault`
        
    const getVault=(e)=>{
            axios({method: 'GET', url: vaultURL})
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
                   
                    setvaultData(resp.data.BackupJobs)
            })
}

// if (vaultData){
//     vaultData.reverse()
// }

const toggler =()=>{
    setToggle(!toggle)
}

    const renderData = () =>{
        if (toggle === true){
            return vaultData
            
        } 
        if (toggle === false){
            return vaultData.slice(0,5)
        }


    }
useEffect(()=>{
    getVault()
}, [])



    return(
    <>
    <div className = 'toggle'>
    <img className = 'logo' src = {awsImg}/>
    <button className='show' onClick={toggler}>{toggle ? "Show Less" : "Show More"}</button>    
    </div>  
    <section className = 'columnAWS'>
            <p>Creation Time</p>
            <p>Resource Arn</p>
            <p>Resource Type</p>
            <p>Backup Size</p>
            <p>Status</p>
    </section>
        {renderData().map((m,i)=> {
            return(
            <section key={i} className = 'dataAWS'>
            <div>
            <p key={i}>
                <Moment format="lll">
                {m.CompletionDate}
                </Moment>
                </p>
            </div>
            <div>
            <p key={i}>{m.ResourceArn.substring(m.ResourceArn.lastIndexOf('/')+1).slice(0, 14)}</p>
            </div>
            <div>
            <p key={i}>{m.ResourceType}</p>
            </div>
            <div>
            <p key={i}>{(m.BackupSizeInBytes / 1073741824).toFixed(2)} GB</p>
            </div>
            {m.State === 'COMPLETED'
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