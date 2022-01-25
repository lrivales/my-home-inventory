import { useMutation } from "@apollo/client";
import React, { useState } from "react";

import { ADD_ITEM } from "../utils/mutations";
import Auth from "../utils/auth";

const Items = (props) => {
    const [modalState, setModalState] = useState('modal');

    const activateModal = async (event) => {
        event.preventDefault();
        setModalState('modal active');
    };

    const deactivateModal = async (event) => {
        event.preventDefault();
        setModalState('modal');
    };

    const [addItemFormState, setAddItemFormState] = useState({ name: '', description: '', value: ''});
    const [addItem, addItemStatus] = useMutation(ADD_ITEM); //add code to update cache

    const handleAddItemFormChange = (event) => {        
        const { name, value, type } = event.target;

        setAddItemFormState({
            ...addItemFormState,
            [name]: type === 'number' ? parseInt(value, 10) : value
        });
    };

    const handleAddItemFormSubmit = async (event) => {
        event.preventDefault();

        const user = await Auth.getProfile();

        try {
            const { data } = await addItem({
                variables: {
                    userId: user.data._id,
                    content: addItemFormState
                }
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <br />
            <button className="btn btn-lg bg-color-tertiary text-light" onClick={activateModal}>Add an Item</button>
            <br />
            {/* add item modal */}
            <div className={modalState} id="addItem-id">
                <a href="#close" className="modal-overlay" aria-label="Close">{null}</a>
                <div className="modal-container">
                    <div className="modal-header">
                        <a 
                            href="#close" 
                            className="btn btn-clear float-right" 
                            aria-label="Close"
                            onClick={deactivateModal}
                        >{null}</a>
                        <div className="modal-title h5">Add New Item</div>
                    </div>
                    <div className="modal-body">
                        <div className="content">
                            {/* add new item form */}
                            <div className="form-group">
                                <form onSubmit={handleAddItemFormSubmit}>
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input 
                                        className="form-input input-lg" 
                                        name="name" 
                                        type="text" 
                                        id="addItem-name" 
                                        placeholder="Name" 
                                        value={addItemFormState.name} 
                                        onChange={handleAddItemFormChange}
                                    />
                                    <label className="form-label" htmlFor="description">Description</label>
                                    <input 
                                        className="form-input input-lg" 
                                        name="description" 
                                        type="text" 
                                        id="addItem-description" 
                                        placeholder="Description" 
                                        value={addItemFormState.description} 
                                        onChange={handleAddItemFormChange}
                                    />
                                    <label className="form-label" htmlFor="value">Value</label>
                                    <input 
                                        className="form-input input-lg" 
                                        name="value" 
                                        type="number" 
                                        id="addItem-value" 
                                        placeholder="value" 
                                        value={addItemFormState.value} 
                                        onChange={handleAddItemFormChange}
                                    />
                                    <br />
                                    <button type="submit" className="btn btn-lg bg-color-tertiary text-light">Submit</button>
                                </form>
                            </div>
                            {addItemStatus.error && <div>Adding your item failed. Please try again.</div>}
                        </div>
                    </div>
                    {/* <div className="modal-footer">
                    ...
                    </div> */}
                </div>
            </div>
            <br />
            {/* item list card */}
            <div className="container">
                <div className="column">
                    <div className="col-3">
                        <div className="card">
                            {/* <div className="card-image">
                                <img src="..." className="img-responsive" />
                            </div> */}
                            <div className="card-header">
                                <div className="card-title h5">2018 Gibson Les Paul Traditional</div>
                                <div className="card-subtitle text-gray">Musical Instrument</div>
                                <div className="card-subtitle text-gray"> $2850</div>
                            </div>
                            {/* <div className="card-body">
                                ...
                            </div> */}
                            <div className="card-footer">
                                <button className="bg-color-tertiary"><i className="icon icon-edit text-light"></i></button>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="bg-color-tertiary"><i className="icon icon-delete text-light"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Items;