import React from "react";
import Button from "./Button";
import "../styles/EditModal.css"

class DeleteModal extends React.Component {
    render(){
        const {deletes, close, data, del} = this.props;

        const delById = id => {
            del(id)
        }
        if(deletes) {
            return(
                <div className="modal-container">
                    <div className="modal-box">
                        <h3>Are You Sure ?</h3>
                        <h5>Want to <span>Delete {data.title}</span> Activity?</h5>
                        <div className="btn-group">
                            <Button text="Oke" variant="primary" action={() => delById(data.id)} />
                            <Button text="Cancel" variant="warning" action={close} />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }
}

export default DeleteModal;