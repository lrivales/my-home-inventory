import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";

import Auth from '../utils/auth';

import { ADD_ITEM } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

import Item from "../components/Item";

const Items = (props) => {
    // toggle modal on or off
    const [modalState, setModalState] = useState('modal');

    const activateModal = async (event) => {
        event.preventDefault();
        setModalState('modal active');
    };

    const deactivateModal = async (event) => {
        event.preventDefault();
        setModalState('modal');
    };

    // controller for adding new item
    const [addItemFormState, setAddItemFormState] = useState({ name: '', description: '', value: ''});
    const [addItem, addItemStatus] = useMutation(ADD_ITEM, {
        refetchQueries: [
            QUERY_ME
        ]
    });

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

            setModalState('modal');
            setAddItemFormState({ name: '', description: '', value: ''});
        } catch (err) {
            console.error(err);
        }
    };

    // controller for query_me
    const { loading, data } = useQuery(QUERY_ME);
    const user = data?.me || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <div>
                <br />
                <br />
                <h4>Please log in or sign up to continue.</h4>
            </div>
        );
    }

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
            <Item items={user.items}/>
        </div>
    )
}

export default Items;