import React from 'react';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import {
    CCol,
    CRow
} from '@coreui/react';

const UpdateCategoriesModal = (props) => {

    const {
        show,
        handleclose,
        modaltitle,
        size,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList,
        onSubmit
    } = props;

    // console.log({expandedArray, checkedArray})

    return (
        <Modal
            show={show ? 1 : 0}
            handleclose={handleclose}
            onSubmit={onSubmit}
            modaltitle={modaltitle}
            size={size}
        >
            <CRow>
                <CCol>
                    <h6>Expanded</h6>
                </CCol>
            </CRow>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) =>
                    <CRow key={index}>
                        <CCol>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                            />
                        </CCol>
                        <CCol>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                <option>select category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </CCol>
                        <CCol>
                            <select
                                className="form-control"
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                            >
                                <option value="undefined">Select Type</option>
                                <option value="total">Total</option>
                                <option value="product">product</option>
                                <option value="store">Store</option>
                            </select>
                        </CCol>
                    </CRow>
                )
            }
            <h6>Checked Categories</h6>
            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) =>
                    <CRow key={index}>
                        <CCol>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                            />
                        </CCol>
                        <CCol>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                <option>select category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </CCol>
                        <CCol>
                            <select
                                className="form-control"
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                            >
                                <option value="undefined">Select Type</option>
                                <option value="total">Total</option>
                                <option value="product">product</option>
                                <option value="store">Store</option>
                            </select>
                        </CCol>
                    </CRow>
                )
            }
        </Modal>
    );
}

export default UpdateCategoriesModal;