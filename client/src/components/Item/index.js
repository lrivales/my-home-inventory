import React from "react";

const Item = ({ items }) => {
    if (items.length === 0) {
        return (
            <div>
                <br />
                <br />
                <h4>Please add an item.</h4>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="columns">
                {items.map(item => (
                    <div className="column col-3" key={item._id}>
                        <div className="card">
                            {/* <div className="card-image">
                                <img src="..." className="img-responsive" />
                            </div> */}
                            <div className="card-header">
                                <div className="card-title h5">{item.name}</div>
                                <div className="card-subtitle text-gray">{item.description}</div>
                                <div className="card-subtitle text-gray">${item.value}</div>
                            </div>
                            {/* <div className="card-body">
                                ...
                            </div> */}
                            <div className="card-footer">
                                {/* <button className="bg-color-tertiary"><i className="icon icon-edit text-light"></i></button>
                                &nbsp;&nbsp;&nbsp;&nbsp; */}
                                <button className="bg-color-tertiary"><i className="icon icon-delete text-light"></i></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Item;