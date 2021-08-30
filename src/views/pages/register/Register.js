import React, { useState } from 'react';
import { signup } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email, 
      password
    }
    dispatch(signup(user));
  }

  if (auth.authenticate || user.message === "Admin created Successfully..!") {
    return <Redirect to={`/`} />
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>

              {/* login */}
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Login</h2>
                    <p>You can Login</p>
                    <p>if you have account.</p>
                    <Link to="/login">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Login Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>

              {/* Register */}
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Sign up</h1>
                    <p className="text-muted">{user.message}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="username" autoComplete="username" onChange={(e) => setFirstName(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="lastname" autoComplete="lastname" onChange={(e) => setLastName(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          @
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" placeholder="Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={userSignup}>Signup</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">login after Signup</CButton>
                      </CCol>
                    </CRow>
                  </CForm>

                </CCardBody>
              </CCard>



            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register

// import React, { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { signup } from "../../../actions";

// /**
//  * @author
//  * @function Signup
//  **/


// const Register = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const auth = useSelector((state) => state.auth);
//   // const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   if (!user.loading) {
//   //     setFirstName("");
//   //     setLastName("");
//   //     setEmail("");
//   //     setPassword("");
//   //   }
//   // }, [user.loading]);

//   const userSignup = (e) => {
//     e.preventDefault();
//     const user = {
//       firstName,
//       lastName,
//       email,
//       password,
//     };
//     dispatch(signup(user));
//   };

//   if (auth.authenticate) {
//     return <Redirect to={`/login`} />;
//   }

//   // if (user.loading) {
//   //   return <p>Loading ....</p>
//   // }

//   return (
//     <div className="c-app c-default-layout flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md="9" lg="7" xl="6">
//             <CCard className="mx-4">
//               <CCardBody className="p-4">
//                 <CForm>
//                   {/* {user.message} */}
//                   <h1>Register</h1>
//                   <p className="text-muted">Create your account</p>
//                   <CRow>
//                     <CCol xs="12" sm="6">
//                       <CInputGroup className="mb-3">
//                         <CInputGroupPrepend>
//                           <CInputGroupText>
//                             <CIcon name="cil-user" />
//                           </CInputGroupText>
//                         </CInputGroupPrepend>
//                         <CInput type="text" placeholder="FirstName" autoComplete="username" onChange={(e) => setFirstName(e.target.value)} />
//                       </CInputGroup>
//                     </CCol>
//                     <CCol xs="12" sm="6">
//                       <CInputGroup className="mb-3">
//                         <CInputGroupPrepend>
//                           <CInputGroupText>
//                             <CIcon name="cil-user" />
//                           </CInputGroupText>
//                         </CInputGroupPrepend>
//                         <CInput type="text" placeholder="lastName" autoComplete="username" onChange={(e) => setLastName(e.target.value)} />
//                       </CInputGroup>
//                     </CCol>
//                   </CRow>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupPrepend>
//                       <CInputGroupText>@</CInputGroupText>
//                     </CInputGroupPrepend>
//                     <CInput type="text" placeholder="Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupPrepend>
//                       <CInputGroupText>
//                         <CIcon name="cil-lock-locked" />
//                       </CInputGroupText>
//                     </CInputGroupPrepend>
//                     <CInput type="password" placeholder="Password" autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} />
//                   </CInputGroup>
//                   <CButton color="success" type="submit"  onClick={userSignup} block>Create Account</CButton>
//                 </CForm>
//               </CCardBody>
//               <CCardFooter className="p-4">
//                 <CRow>
//                   <CCol>
//                     <CButton className="btn-warning mb-1 text-right" block>
//                       <span>پسورد بیش از 6 رقم باشد -</span>
//                       <br />
//                       <span>ایمیل خود را به درستی وارد کنید -</span>
//                     </CButton>
//                   </CCol>
//                 </CRow>
//               </CCardFooter>
//             </CCard>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   )
// }

// export default Register
