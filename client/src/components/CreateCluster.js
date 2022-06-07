import React from 'react'

const CreateCluster = props => {
    if (!props.show) {
        return null
    }

    return (
        <div className="kos">
            <div className="component--kos">
                <div className="kos-card">
                    <header>
                        <h5 className="text-white text-2xl">KOS</h5>
                    </header>
                    <div className="kos-content">
                        <form>
                            <ul>
                                <li>
                                    <label className="title">Select a Cluster Provider</label>
                                    <select name="cluster_provider" >
                                        <option value="aws">AWS</option>
                                        <option value="openstack">Openstack</option>
                                        <option value="kind">Kind-Docker</option>
                                        <option value="google">Google Cloud</option>
                                    </select>
                                </li>
                                <li>
                                    <label className="title">Select a Worker Machine</label>
                                    <select name="worker_machine" >
                                        <option value="3">3</option>
                                        <option value="5">5</option>
                                        <option value="7">7</option>
                                    </select>
                                </li>
                                <li>
                                    <label className="title">Select a Control Node</label>
                                    <select name="control_node" >
                                        <option value="3">3</option>
                                        <option value="5">5</option>
                                        <option value="7">7</option>
                                    </select>
                                </li>
                                <li>
                                    <label className="title">Cluster Name</label>
                                    <input type="text" name="cluster_name" />
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

export default CreateCluster
