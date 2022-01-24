import React, { useState } from "react";
import { Link } from "react-router-dom";

const Items = (props) => {
    const [modalState, setModalState] = useState('modal');

    const activateModal = async (event) => {
        event.preventDefault();
        setModalState('modal active');
    };

    const deactivateModal = async (event) => {
        event.preventDefault();
        setModalState('modal');
    }

    return (
        <div className="form-padding">
            <br />
            <button className="btn btn-lg bg-color-tertiary text-light" onClick={activateModal}>Add an Item</button>
            <br />
            {/* add item modal */}
            <div className={modalState} id="addItem-id">
                {/* <a href="#close" className="modal-overlay" aria-label="Close"></a> */}
                <Link to='/home-inventory/items' className="modal-overlay" aria-label="Close"></Link>
                <div className="modal-container">
                    <div className="modal-header">
                        {/* <a href="#close" className="btn btn-clear float-right" aria-label="Close"></a> */}
                        <Link to='/home-inventory/items' className="btn btn-clear float-right" aria-label="Close" onClick={deactivateModal}></Link>
                        <div className="modal-title h5">New Item</div>
                    </div>
                    <div className="modal-body">
                        <div className="content">
                            {/* add new item form here */}
                        </div>
                    </div>
                    <div className="modal-footer">
                    ...
                    </div>
                </div>
            </div>

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