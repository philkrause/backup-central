import React, { useState, useEffect } from 'react'
import '../css/Mongo.css'
import axios from 'axios'
import mongoImg from '../images/mongo.jpg'
import Moment from 'react-moment'


export default function Mongo(){

    const [mongoData, setmongoData] = useState([])
    const [recentData, setrecentData] = useState([])
    const [filter, setFilter] = useState([])
    let [toggle, setToggle] = useState(false)
    const mongoURL = `http://localhost:8080/mongo`
        
    const getMongo=(e)=>{
            axios({method: 'GET', url: mongoURL})
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
                    setmongoData(resp.data.results)
                    setrecentData(resp.data.results.slice(0,3))
                    setFilter(mongoData.map(f =>  f.created.date.split('-')).map(f => f[2]))
            })
}
const toggler =()=>{
    setToggle(!toggle)
}

    const renderData = () =>{
        if (toggle === true){
            return mongoData
            
        } 
        if (toggle === false){
            return recentData
        }


    }
useEffect(()=>{
    getMongo()
}, [])



    return(
    <>
    <img className = 'logo' src = {mongoImg}/>
    <div className = 'toggle'>
    <button className='show' onClick={toggler}>{toggle ? "Show Less" : "Show More"}</button>    
    </div>  
    <section className = 'column'>
            <p>Creation Time</p>
            <p>Backup Job ID</p>
            <p>Data Size</p>
            <p>File Size</p>
            <p>Status</p>
    </section>
        {renderData().map((m,i)=> {
            return(
            <section key={i} className = 'data'>
            <div>
            <p key={i}>
                <Moment format="lll">
                {m.created.date}
                </Moment>
                </p>
            </div>
            <div>
            <p key={i}>{m.id.slice(0,15)}</p>
            </div>
            <div>
            <p key={i}>{(m.parts[0].dataSizeBytes / 1073741824).toFixed(2)} GB </p>
            </div>
            <div>
            <p key={i}>{(m.parts[0].fileSizeBytes /1073741824 ).toFixed(2)} GB</p>
            </div>
            {m.complete
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





//    const today = new Date()
//    const dd = String(today.getDate()).padStart(2, '0');
//    const day = filter.map(m => m.substring(0,2))
    // const day = filtered.substring(0, filtered.lastIndexOf('T'))   
   
//    const todayMongo = () => {
//         setFilter(mongoData.map(f =>  f.created.date.split('-')).map(f => f[2]))
//         const day = filter.map(m => m.substring(0,2))
//             console.log(filter, "filtered")
//             console.log(dd, "dd")
//             console.log(day)
//             // console.log(day,"day")
//         }