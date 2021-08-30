import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder, deleteOrder, initialDataOrders } from "../../actions";
import Input from '../../components/UI/Input';
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CButton,
  CDataTable
} from '@coreui/react'
import "./style.css";

/**
 * @author
 * @function Orders
 **/



const Orders = (props) => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const [details, setDetails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialDataOrders());
  }, [dispatch])

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };

  const onDelete = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const onStatusChange = (e) => {
    setType(e.target.value)
  }


  // CDataTable neccessery 
  const fields = [
    { key: 'Username', label: 'Name', _style: { width: '20%' } },
    { key: 'userlastName', label: 'lastName', _style: { width: '20%' } },
    { key: 'Useremail', label: 'Email', _style: { width: '20%' } },
    { key: 'addressphone', label: 'Phone', _style: { width: '15%' } },
    { key: 'addressunit', label: 'Unit', _style: { width: '15%' } },
    { key: 'addresscity', label: 'City', _style: { width: '15%' } },
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
              Order
              <small className="text-muted"> 's</small>
            </div>
            <div className="mr-3">
              <CButton shape="pill" color="danger" size="sm" block>Clear</CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={order.orders}
              fields={fields}
              columnFilter
              tableFilter
              footer
              itemsPerPageSelect
              itemsPerPage={10}
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
                        <CCardBody>
                          <CRow className="ml-0">
                            <h5>
                              Address : {' '}
                              {item.addresspalce}
                            </h5>
                          </CRow>

                          <CRow>
                            <CCol className="col-5">
                              <div className="title">Items</div>
                              {item.items.map((item, index) => (
                                <div className="value" key={index}>
                                  {item.productId.name}
                                </div>
                              ))}
                            </CCol>
                            <CCol>
                              <span className="title">Total Price</span> <br />
                              <span className="value">{item.totalAmount}</span>
                            </CCol>
                            <CCol>
                              <span className="title">Payment Status</span> <br />
                              <span className="value">{item.paymentType}</span>
                            </CCol>
                            <CCol>
                              <span className="title">Payment Status</span> <br />
                              <span className="value">{item.paymentStatus}</span>
                            </CCol>
                          </CRow>

                          <CRow className="py-5 px-5">
                            <CCol className="orderTrack">
                              {item.orderStatus.map((status, index) => (
                                <div
                                  key={index}
                                  className={`orderStatus ${status.isCompleted ? "active" : ""
                                    }`}
                                >
                                  <div className={`point ${status.isCompleted ? "active" : ""}`}></div>

                                  <div className="orderInfo">
                                    <div className="status">{status.type}</div>
                                    <div className="date formatdat">{formatDate(status.date)}</div>
                                  </div>
                                  
                                </div>
                              ))}
                            </CCol>
                          </CRow>

                          <CRow>
                            <CCol className="d-flex justify-content-between mt-3">
                              <div className="d-flex ml-5">
                                <Input
                                  type="selectStatus"
                                  value={type}
                                  onChange={onStatusChange}
                                  options={item.orderStatus}
                                  placeholder={'Select status'}
                                />
                                <CButton size="sm" color="success" className="ml-4 Buttom"
                                  onClick={() => {
                                    onOrderUpdate(item._id)
                                  }}>
                                  Confirm
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
  );
};

export default Orders;
