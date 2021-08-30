import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllCategory,
    addCategory,
    updateCategories,
    deleteCategories as deleteCategoriesAction
} from '../../actions';
import {
    CCard, CRow, CCol, CCardHeader, CCardBody, CButton
} from '@coreui/react';
import Modal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';

// cil-task
import CIcon from '@coreui/icons-react';

import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';
import './style.css';

/**
* @author
* @function Category
**/

const Category = (props) => {

    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [categoryType, setCategoryType] = useState('total');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

        if (!category.loading) {
            setShow(false);
            setUpdateCategoryModal(false);
        }

    }, [category.loading]);


    const handleClose = () => {
        const form = new FormData();
        if (categoryName === "") {
            alert('Category name is required');
            setShow(false);
            return;
        }
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        form.append('type', categoryType);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const handleCategoryInput = (key, value, index, type) => {
        // console.log(value);
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index === _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        dispatch(updateCategories(form));
        // setUpdateCategoryModal(false);
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        //const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        //const idsArray = expandedIdsArray.concat(checkedIdsArray);
        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory())
                        setDeleteCategoryModal(false)
                    }
                });
        }
        setDeleteCategoryModal(false);
    }

    const renderDeleteCategoryModal = () => {
        return (
            <Modal
                modaltitle="Confirm"
                show={deleteCategoryModal ? 1 : 0}
                handleclose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            setDeleteCategoryModal(false);
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >
                <h5>Expanded</h5>
                { expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}
                <h5>Checked</h5>
                { checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}

            </Modal>
        );
    }

    const categoryList = createCategoryList(category.categories);

    return (
        <CRow>
            <CCol xs="12">
                <CCard>
                    <CCardHeader className="d-flex justify-content-between">
                        <h5>Category</h5>
                        <div className="actionBtnContainer">
                            <CButton onClick={handleShow} shape="pill" color="success" size="sm">
                                <CIcon name="cil-envelope-closed" /> <span>Add</span>
                            </CButton>
                            <CButton onClick={deleteCategory} shape="pill" color="danger" size="sm">
                                <CIcon name="cil-trash" /> <span>Delete</span>
                            </CButton>
                            <CButton onClick={updateCategory} shape="pill" color="info" size="sm">
                                <CIcon name="cil-pencil" /> <span>Edit</span>
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <CIcon name="cil-check-circle" />,
                                uncheck: <CIcon name="cil-circle" />,
                                halfCheck: <CIcon name="cil-scrubber" />,
                                expandClose: <CIcon name="cil-chevron-right" />,
                                expandOpen: <CIcon name="cil-chevron-bottom" />,
                                parentClose: <CIcon name="cil-envelope-closed" />,
                                parentOpen: <CIcon name="cil-envelope-open" />,
                                leaf: <CIcon name="cil-file" />
                            }}
                        />
                        {/* {JSON.stringify(renderCategories(category.categories))} */}

                    </CCardBody>
                </CCard>
            </CCol>
            <AddCategoryModal
                show={show}
                handleclose={() => setShow(false)}
                modaltitle={'Add New Category'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryType={categoryType}
                setCategoryType={setCategoryType}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
                onSubmit={handleClose}
            />
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleclose={() => setUpdateCategoryModal(false)}
                onSubmit={updateCategoriesForm}
                modaltitle={'Update Categories'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />
            {renderDeleteCategoryModal()}
        </CRow>
    )
}

export default Category;