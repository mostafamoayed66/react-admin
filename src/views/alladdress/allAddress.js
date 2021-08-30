import React, { useState, useEffect } from 'react';
import { getallAddress, deleteAddressById } from "../../actions";
import { useDispatch, useSelector } from 'react-redux';
import './address.css'

import {
    CCol,
    CRow,
    CCard,
    CCardBody,
    CCardHeader,
    CCollapse,
    CButton,
    CDataTable
} from '@coreui/react';

/**
* @author
* @function AllAddress
**/

const Address = (props) => {
    const addresses = useSelector(state => state.address);
    const [details, setDetails] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getallAddress());
    }, [dispatch]);

    const onDelete = (addressId) => {
        // console.log(addressId)
        dispatch(deleteAddressById(addressId));
    };

    const fields = [
        { key: 'userName', label: 'Name', _style: { width: '20%' } },
        { key: 'userlastName', label: 'lastName', _style: { width: '25%' } },
        { key: 'userEmail', label: 'Email', _style: { width: '20%' } },
        { key: 'createdAt', label: 'CreateAt', _style: { width: '25%' } },
        {
            key: 'show_details',
            label: 'Action',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
    ];

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
        setDetails(newDetails)
    };

    return (
        <CRow>
            <CCol xl={12}>
                <CCard>
                    <CCardHeader className="d-flex justify-content-between">
                        <div>
                            Address
                        <small className="text-muted"> 's</small>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={addresses.alladdress}
                            fields={fields}
                            columnFilter
                            tableFilter
                            footer
                            itemsPerPageSelect
                            itemsPerPage={20}
                            hover
                            sorter
                            pagination
                            scopedSlots={{
                                'show_details':
                                    (item, index) => {
                                        return (
                                            <td className="py-2">
                                                <CButton
                                                    color="primary"
                                                    variant="outline"
                                                    shape="square"
                                                    size="sm"
                                                    onClick={() => { toggleDetails(index) }}
                                                >
                                                    {details.includes(index) ? 'Hide' : 'Show'}
                                                </CButton>
                                            </td>
                                        )
                                    },
                                'details':
                                    (item, index) => {
                                        return (
                                            <CCollapse show={details.includes(index)}>
                                                <CCardHeader>
                                                    Address details that user add before shopping:
                                                </CCardHeader>
                                                <CCardBody>

                                                    <CRow>
                                                        {item.address.map((status, index) => (
                                                            <CCol
                                                                key={index}
                                                                xs="4"
                                                            >
                                                                <CCard
                                                                    className="styleCCol">
                                                                    <CCardBody>
                                                                        <CCol className="userStatus">
                                                                            نام : {status.name}
                                                                        </CCol>
                                                                        <CCol className="userStatus">
                                                                            آدرس : {status.address}
                                                                        </CCol>
                                                                        <CCol className="userStatus">
                                                                            تلفن: {status.mobileNumber}
                                                                        </CCol>
                                                                        <CCol className="userStatus">
                                                                            استان: {status.state}
                                                                        </CCol>
                                                                        <CCol className="userStatus">
                                                                            شهر: {status.cityDistrictTown}
                                                                        </CCol>
                                                                    </CCardBody>
                                                                </CCard>
                                                            </CCol>
                                                        ))}
                                                    </CRow>

                                                    <CRow>
                                                        <CCol>
                                                            <span className="title">Admin Decision:</span>
                                                        </CCol>
                                                    </CRow>

                                                    <CRow>
                                                        <CCol className="d-flex justify-content-between mt-4">
                                                            <div className="d-flex ml-5">
                                                                <CButton size="sm" color="warning" className="Buttom">
                                                                    <span style={{ color: "#000" }}>Edit</span>
                                                                </CButton>
                                                                <CButton size="sm" color="success" className="ml-4 Buttom"
                                                                    onClick={() => {
                                                                        // onOrderUpdate(item._id)
                                                                    }}>
                                                                    Update
                                                                </CButton>
                                                            </div>
                                                            <CButton size="sm" color="danger" className="mr-5 Buttom"
                                                                onClick={() => {
                                                                    onDelete(item._id)
                                                                    setDetails([])
                                                                }}
                                                            >
                                                                Delete
                                                            </CButton>
                                                        </CCol>
                                                    </CRow>
                                                </CCardBody>
                                            </CCollapse>
                                        )
                                    }
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>


    )
}

export default Address