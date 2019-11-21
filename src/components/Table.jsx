import React, { useState, useEffect } from 'react'
import '../css/Table.css'
import axios from 'axios'

export default function Table(){

    const [mongoData, setMongoData] = useState([])
    
    const url = `http://localhost:8080/mongo`
        
        
    const getMongo=()=>{
        axios({method: 'GET', url: url})
        .then(resp=> {
            console.log(resp.data)
            setMongoData(resp.data.results)
        })
    }
    
    useEffect(()=>{
        getMongo()
    }, [])
    
    return(
    <>
    <section className = 'stats'>
            <h4>Creation Time</h4>
            <h4>Backup Job ID</h4>
            <h4>Data Size</h4>
            <h4>File Size</h4>
            <h4>Status</h4>
    </section>
        {mongoData.map((m,i)=> {
            return(
            <section key={i} className = 'data'>
            
            <div>
            <p key={i}>{m.created.date}</p>
            </div>
            <div>
            <p key={i}>{m.id}</p>
            </div>
            <div>
            <p key={i}>{Math.round(m.parts[0].dataSizeBytes / 1000000000)}GB </p>
            </div>
            <div>
            <p key={i}>{Math.round(m.parts[0].fileSizeBytes / 1000000000)}GB</p>
            </div>
            <div>
            <p key={i}>{m.complete ? 'Completed' : 'NOT Completed'}</p>
            </div>
            </section>
            )
        })
    
        }
    </>
)

}