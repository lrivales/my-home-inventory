import { useMutation } from "@apollo/client";
import React from "react";

import Auth from "../../utils/auth";

import { QUERY_ME } from "../../utils/queries";
import { DELETE_ITEM } from "../../utils/mutations";

const Item = ({ items }) => {
    const [deleteItem, deleteItemStatus] = useMutation(DELETE_ITEM, {
        refetchQueries: [QUERY_ME]
    });

    if (items.length === 0) {
        return (
            <div>
                <br />
                <br />
                <h4>Please add an item.</h4>
            </div>
        )
    }

    const handleDeleteButton = async (event) => {
        event.preventDefault();
        
        const user = await Auth.getProfile();
        
        try {
            const { data } = await deleteItem({
                variables: {
                    userId: user.data._id,
                    itemId: event.target.id
                }
            });
            
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            <div className="columns">
                {items.map(item => (
                    <div className="column col-3" key={item._id}>
                        <form>
                            <div className="card">
                                <div className="card-image">
                                    <img src={item.image} className="img-responsive" />
                                </div>
                                <div className="card-header">
                                    <div className="card-title h5">{item.name}</div>
                                    <div className="card-subtitle text-gray">{item.description}</div>
                                    <div className="card-subtitle text-gray">${item.value}</div>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-error">
                                        <i 
                                            className="icon icon-delete text-light" 
                                            id={item._id} 
                                            onClick={handleDeleteButton}>
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </form>   
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Item;