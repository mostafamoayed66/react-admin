import React from "react";
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react'
/**
 * @author
 * @function Modal
 **/

const NewModal = (props) => {
    return (
        <CModal size={props.size} show={props.show ? true : false} onClose={props.handleclose} >
            <CModalHeader closeButton>
                <CModalTitle>{props.modaltitle}</CModalTitle>
            </CModalHeader>
            <CModalBody>{props.children}</CModalBody>
            <CModalFooter>
                {props.buttons ? (
                    props.buttons.map((btn, index) => (
                        <CButton key={index} color={btn.color} onClick={btn.onClick}>
                            {btn.label}
                        </CButton>
                    ))
                ) : (
                        <CButton
                            color="success"
                            className="btn-sm"
                            onClick={props.onSubmit}
                        >
                            Save
                        </CButton>
                    )}
            </CModalFooter>
        </CModal>
    );
};

export default NewModal;
