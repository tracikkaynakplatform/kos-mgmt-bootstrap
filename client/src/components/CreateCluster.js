import React, {useState} from 'react'
import axios from "axios";
import {data} from "autoprefixer";

export default function CreateCluster(props) {

    const [formData, setFormData] = useState({
        cluster_name: '',
        cluster_provider: '',
        worker_machine: '',
        control_node: ''
    })

    if (!props.show) {
        return null
    }

    const watchLog = () => {

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function watchKind(){
            let status = true
            while(status){
                axios.get("http://localhost:1453/create/status").then(res => {
                    if (res.data.end) {
                        status = false
                    }
                    console.log(res.data)
                }).catch(err => {
                    console.log(err)
                })
                if (status === false)
                    break
                await sleep(1000);
            }
        }
        watchKind()
    }

    const handleSubmit = event => {
        event.preventDefault()
        const data = JSON.stringify({cluster_name: formData.cluster_name})

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
        };

        axios.post("http://localhost:1453/create", data, {headers},).then(res => {
            console.log(res)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
        watchLog()
    }

    const handleChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="kos">
            <div className="component--kos">
                <div className="kos-card">
                    <header>
                        <h5 className="text-white text-2xl">KOS</h5>
                    </header>
                    <div className="kos-content">
                        <form onSubmit={handleSubmit}>
                            <ul>
                                <li>
                                    <label className="title">Select a Cluster Provider</label>
                                    <select defaultValue={'DEFAULT'} name="cluster_provider" onChange={handleChange}>
                                        <option value="DEFAULT" disabled>Select</option>
                                        <option value="aws">AWS</option>
                                        <option value="openstack">Openstack</option>
                                        <option value="kind">Kind-Docker</option>
                                        <option value="google">Google Cloud</option>
                                    </select>
                                </li>
                                <li>
                                    <label className="title">Select a Worker Machine</label>
                                    <select defaultValue={'DEFAULT'} name="worker_machine" onChange={handleChange}>
                                        <option value="DEFAULT" disabled>Select</option>
                                        <option value="3">3</option>
                                        <option value="5">5</option>
                                        <option value="7">7</option>
                                    </select>
                                </li>
                                <li>
                                    <label className="title">Select a Control Node</label>
                                    <select defaultValue={'DEFAULT'} name="control_node" onChange={handleChange}>
                                        <option value="DEFAULT" disabled>Select</option>
                                        <option value="3">3</option>
                                        <option value="5">5</option>
                                        <option value="7">7</option>
                                    </select>
                                </li>
                                <li>
                                    <label className="title">Cluster Name</label>
                                    <input type="text" name="cluster_name" onChange={handleChange}/>
                                </li>
                            </ul>
                            <div className="flex">
                                <button type="button" className="bg-red-600" onClick={props.onClose}>Cancel</button>
                                <button type="submit" className="button ml-4">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

