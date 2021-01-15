/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
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

  if (props.contactMessage) {
    toast.info(props.contactMessage);
  };

  return (
    <div>
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
    </div>
  );
};

const mapStateToProps = (state) => {
  const { errorMessage, successMessage, loader, editedTask, contactMessage } = state;
  return {
    errorMessage,
    successMessage,
    contactMessage,
    loader,
    editedTask
  };
};

export default connect(mapStateToProps, null)(App);
