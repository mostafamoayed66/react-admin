import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addMainPage, getMainPage, deleteMainPage } from "../../actions";
import { generatePublicUrl } from '../../urlConfig';
import Dropzone from 'react-dropzone';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
} from '@coreui/react';
import './stylemain.css';

const Dashboard = () => {
    const category = useSelector((state) => state.category);
    const mains = useSelector((state) => state.main);
    const dispatch = useDispatch();
    const [files, setfiles] = useState([]);
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const maxSize = 3145728;
    let check = true;
    const [swiperOnes, setswiperOnes] = useState([]);

    const onDrop = (acceptedFiles) => {
        if (check) {
            setfiles(files.concat(acceptedFiles))
        }
        else {
            alert(' نام عکس تکراری می باشد.    (لطفا نام را عوض کنید)');
            check = true;
        }
    }

    const acceptedFileItems = files.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    };

    useEffect(() => {
        dispatch(getMainPage());
    }, [dispatch]);

    useEffect(() => {
        setswiperOnes(mains)
    }, [mains]);

    const onSubmit = () => {
        const data = new FormData();
        if (files.length === 0 || name === "" || categoryId === "") {
            return;
        }
        data.append("name", name);
        data.append("category", categoryId);
        for (let pic of files) {
            data.append("swiperPicture", pic);
        }
        onClear();
        dispatch(addMainPage(data));
    };

    const onClear = () => {
        setfiles([]);
        setName("");
        setCategoryId("");
    };

    const onDelete = (swiperOnesId, swiperPig) => {
        const pigForDelete = [];
        for (let pic of swiperPig) {
            pigForDelete.push(pic.img);
        }
        dispatch(deleteMainPage(swiperOnesId, pigForDelete));
    }

    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard>
                        <CCardBody>
                            <Dropzone
                                onDrop={acceptedFiles => {
                                    for (let i = 0; i < files.length; i++) {
                                        if (files[i].path === acceptedFiles[0].name) {
                                            check = false;
                                        }
                                    }
                                    onDrop(acceptedFiles)
                                }}
                                accept="image/jpeg, image/png, image/jpg, image/gif"
                                minSize={0}
                                maxSize={maxSize}
                            >
                                {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                                    const isFileTooLarge = rejectedFiles && rejectedFiles[0].size > maxSize;
                                    return (
                                        <div
                                            style={{ border: '1px dotted #000', padding: '20px', textAlign: 'center' }}
                                            {...getRootProps()}
                                        >
                                            <input {...getInputProps()} name="swiperOnePicture" />
                                            {!isDragActive && 'Drag & drop image, Or click to select images!'}
                                            {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                            {isDragReject && "Image type not accepted, sorry!"}
                                            {isFileTooLarge && (
                                                <div className="text-danger mt-2">
                                                    File is too large.
                                                </div>
                                            )}
                                        </div>
                                    )
                                }}
                            </Dropzone>
                            <CRow className="mt-4">
                                <CCol>
                                    <select
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    >
                                        <option value="">select name</option>
                                        <option value="swiperOne">Swiper One</option>
                                        <option value="swiperTwo">swiper Two</option>
                                        <option value="swiperThree">swiper Three</option>
                                        <option value="swiperFour">swiper Four</option>
                                        <option value="swiperFive">swiper Five</option>
                                        <option value="swiperSix">swiper Six</option>
                                    </select>
                                </CCol>
                                <CCol>
                                    <select
                                        className="form-control"
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
                                </CCol>
                            </CRow>
                            <div className="mt-3">
                                <h5>Accepted images</h5>
                                <ul>{acceptedFileItems}</ul>
                                <CButton size="sm" color="info" onClick={() => onSubmit()}>
                                    Submit
                                </CButton>
                                <CButton size="sm" color="warning" className="ml-4" onClick={() => onClear()}>
                                    Clear
                                </CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>


                <CCol>
                    <CCard>
                        <CCardBody>
                            {
                                swiperOnes.swiperPigs ? swiperOnes.swiperPigs.map((swip, index) => {
                                    return (
                                        <div key={index} className="swipItem">
                                            <span>Name :  {swip.name}</span>
                                            <p className="txtStyle">Category :  {swip.category.name}</p>
                                            {
                                                swip.swiperPictures.map((pic, index) => (
                                                    <span className="productImgContainer" key={index}>
                                                        <img src={generatePublicUrl(pic.img)} alt="" />
                                                    </span>
                                                ))
                                            }
                                            <div>
                                                <CButton size="sm" color="danger" className="buttonStyle"
                                                    onClick={() => onDelete(swip._id, swip.swiperPictures)}>
                                                    Delete
                                                </CButton>
                                            </div>
                                        </div>
                                    )
                                }) : null
                            }
                        </CCardBody>
                    </CCard>
                </CCol>


            </CRow>
        </div>
    )
}

export default Dashboard;
