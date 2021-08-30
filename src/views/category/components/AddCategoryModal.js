import React from 'react';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import {
    CRow,
    CCol
} from '@coreui/react';

const AddCategoryModal = (props) => {

    const {
        show,
        handleclose,
        modaltitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryType,
        setCategoryType,
        categoryList,
        handleCategoryImage,
        onSubmit
    } = props;

    return (
        <Modal
            show={show ? 1 : 0}
            handleclose={handleclose}
            onSubmit={onSubmit}
            modaltitle={modaltitle}
        >
            <CRow>
                <CCol>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control-sm"
                    />
                </CCol>
                <CCol>
                    <select
                        className="form-control form-control-sm"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>select category</option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                </CCol>
                <CCol>
                    <select
                        className="form-control form-control-sm"
                        value={categoryType}
                        onChange={(e) => setCategoryType(e.target.value)}
                    >
                        <option value="total">Total</option>
                        <option value="product">product</option>
                        <option value="store">Store</option>
                    </select>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </CCol>
            </CRow>
        </Modal>
    );
}

export default AddCategoryModal;