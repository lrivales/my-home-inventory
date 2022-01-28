import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {Convert} from 'mongo-image-converter';

import Auth from '../utils/auth';

import { ADD_ITEM } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

import Item from "../components/Item";
import Download from "../components/Download";
import Navbar from "../components/Navbar";

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
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemValue, setItemValue] = useState('');
    const [itemImage, setItemImage] = useState('');

    const handleItemNameFormChange = (event) => {
        setItemName(event.target.value);
    };

    const handleItemDescriptionFormChange = (event) => {
        setItemDescription(event.target.value);
    };

    const handleItemValueFormChange = (event) => {
        setItemValue(parseInt(event.target.value, 10));
    };

    const handleItemImageFormChange = async (event) => {
        let imageFile = event.target.files[0];
        try {
            const convertedImage = await Convert(imageFile)
            if (convertedImage) {
                setItemImage(convertedImage);
            } else {
                window.alert('The file is not in format of image/jpeg or image/png');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const [addItem, addItemStatus] = useMutation(ADD_ITEM, {
        refetchQueries: [QUERY_ME]
    });

    const handleAddItemFormSubmit = async (event) => {
        event.preventDefault();

        const user = await Auth.getProfile();

        try {
            await addItem({
                variables: {
                    userId: user.data._id,
                    content: {
                        name: itemName,
                        description: itemDescription,
                        value: itemValue,
                        image: itemImage
                    }
                }
            });

            setModalState('modal');
            document.getElementById('addItemForm').reset();
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
            <Navbar />
            <br />
            <button className="btn btn-lg bg-color-tertiary text-light" onClick={activateModal}>Add an Item</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Download items={user.items}/>
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
                                <form id="addItemForm" onSubmit={handleAddItemFormSubmit}>
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input 
                                        className="form-input input-lg" 
                                        name="name" 
                                        type="text" 
                                        id="addItem-name" 
                                        placeholder="Name" 
                                        onChange={handleItemNameFormChange}
                                    />
                                    <label className="form-label" htmlFor="description">Description</label>
                                    <input 
                                        className="form-input input-lg" 
                                        name="description" 
                                        type="text" 
                                        id="addItem-description" 
                                        placeholder="Description" 
                                        onChange={handleItemDescriptionFormChange}
                                    />
                                    <label className="form-label" htmlFor="value">Value</label>
                                    <input 
                                        className="form-input input-lg" 
                                        name="value" 
                                        type="number" 
                                        id="addItem-value" 
                                        placeholder="value" 
                                        onChange={handleItemValueFormChange}
                                    />
                                    <label className="form-label" htmlFor="image">Image</label>
                                    <input
                                        className="form-input input-lg"
                                        name="image"
                                        type="file"
                                        id="addItem-image"
                                        accept="image/png, image/jpeg"
                                        onInput={handleItemImageFormChange}
                                    />
                                    <br />
                                    <button type="submit" className="btn btn-lg bg-color-tertiary text-light">Submit</button>
                                </form>
                            </div>
                            {addItemStatus.error && <div>Adding your item failed. Please try again.</div>}
                        </div>
                    </div>
                </div>
            </div>
            <br />
            {/* item list card */}
            <Item items={user.items}/>
        </div>
    )
}

export default Items;