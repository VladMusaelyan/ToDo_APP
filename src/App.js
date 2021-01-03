/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import './App.css';
import Routes from './Project/Routes/Routes';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './assets/functions/Spinner';
import EditTask from './Project/EditTask/EditTask';

function App(props) {

  if (props.errorMessage) {
    toast.error(props.errorMessage.message);
  };

  if (props.successMessage) {
    toast.success(props.successMessage);
  };

  return (
    <>
      <Routes />

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {
        props.loader &&
        <Spinner />
      }

      {
        !!props.editedTask &&
        <EditTask />
      }
    </>
  );
};

const mapStateToProps = (state) => {
  const { errorMessage, successMessage, loader, editedTask } = state;
  return {
    errorMessage,
    successMessage,
    loader,
    editedTask
  };
};

export default connect(mapStateToProps, null)(App);
