import React, { useState, useEffect } from 'react';
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, addProduct, deleteProductById } from "../../actions";
import { generatePublicUrl } from '../../urlConfig';
import "./style.css";
import {
    CCard,
    CCardHeader,
    CCardBody,
    CRow,
    CCol,
    CButton,
    CDataTable,
    CCollapse
} from '@coreui/react';

/**
 * @author
 * @function Products
 **/

const Products = (props) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [productPictures, setProductPictures] = useState([]);
    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    const handleClose = () => {
        setShow(false);
    };

    const submitProductForm = () => {
        const form = new FormData();
        form.append("name", name);
        form.append("quantity", quantity);
        form.append("price", price);
        form.append("description", description);
        form.append("category", categoryId);

        for (let pic of productPictures) {
            form.append("productPicture", pic);
        }

        dispatch(addProduct(form)).then(() => setShow(false));
    };
    const handleShow = () => setShow(true);

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }

        return options;
    };

    const handleProductPictures = (e) => {
        setProductPictures([...productPictures, e.target.files[0]]);
    };

    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        setProductDetailModal(true);
    };

    // CDataTable neccessery 
    // CDataTable fields
    const fields = [
        { key: 'name', _style: { width: '20%' } },
        { key: 'price', _style: { width: '20%' } },
        { key: 'quantity', _style: { width: '10%' } },
        { key: 'categoryname', label: 'Category', _style: { width: '30%' } },
        {
            key: 'show_details',
            label: 'Action',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
    ];
    // CDataTable (Hide or Show : Admin decision maker)
    const [details, setDetails] = useState([]);
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

    const renderProducts = () => {
        return (
            <CRow>
                <CCol xl={12}>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between">
                            <div>
                                Product
                                <small className="text-muted"> 's</small>
                            </div>
                            <div className="mr-3">
                                <CButton shape="pill" color="success" onClick={handleShow} size="sm" block>Add</CButton>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={product.products}
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
                                                        <h4>
                                                            {item.username}
                                                        </h4>
                                                        <p className="text-muted">Admin decision making:</p>
                                                        <CButton size="sm" color="info" className="ml-2"
                                                            onClick={() => showProductDetailsModal(item)}
                                                        >
                                                            info
                                                        </CButton>
                                                        <CButton size="sm" color="danger" className="ml-4"
                                                            onClick={() => {
                                                                setDetails([])
                                                                const payload = {
                                                                    productId: item._id,
                                                                };
                                                                dispatch(deleteProductById(payload));
                                                            }}
                                                        >
                                                            Delete
                                                        </CButton>
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

    const renderAddProductModal = () => {
        return (
            <Modal
                show={show ? 1 : 0}
                handleclose={handleClose}
                modaltitle={"Add New Product"}
                onSubmit={submitProductForm}
            >
                <Input
                    label="Name"
                    value={name}
                    placeholder={`Product Name`}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="Quantity"
                    value={quantity}
                    placeholder={`Quantity`}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    label="Price"
                    value={price}
                    placeholder={`Price`}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    label="Description"
                    value={description}
                    placeholder={`Description`}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className="form-control mb-3"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option>select category</option>
                    {createCategoryList(category.categories).map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
                {productPictures.length > 0
                    ? productPictures.map((pic, index) => (
                        <div key={index}>{pic.name}</div>
                    ))
                    : null}
                <input
                    type="file"
                    name="productPicture"
                    onChange={handleProductPictures}
                />
            </Modal>
        );
    };

    const handleCloseProductDetailsModal = () => {
        setProductDetailModal(false);
    };



    const renderProductDetailsModal = () => {
        if (!productDetails) {
            return null;
        }

        return (
            <Modal
                show={productDetailModal ? 1 : 0}
                handleclose={handleCloseProductDetailsModal}
                onSubmit={handleCloseProductDetailsModal}
                modaltitle={"Product Details"}
                size="lg"
            >
                <CRow>
                    <CCol md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </CCol>
                    <CCol md="6">
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="6">
                        <label className="key">Quantity</label>
                        <p className="value">{productDetails.quantity}</p>
                    </CCol>
                    <CCol md="6">
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <label className="key">Product Pictures</label>
                        <div style={{ display: "flex" }}>
                            {productDetails.productPictures.map((picture, index) => (
                                <div className="productImgContainer" key={index}>
                                    <img src={generatePublicUrl(picture.img)} alt="" />
                                </div>
                            ))}
                        </div>
                    </CCol>
                </CRow>
            </Modal>
        );
    };

    return (
        <CRow xs="12">
            <CCol>
                {renderProducts()}
            </CCol>
            {renderAddProductModal()}
            {renderProductDetailsModal()}
        </CRow>
    );
};

export default Products;
