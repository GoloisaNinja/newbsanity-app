import React, { Fragment } from 'react';

const Modal = ({ show, handleClose, handleDismiss, content }) => {
  return (
    show && (
      <Fragment>
        <div className='modalStyle'>
          <div>
            <img className='modal-icon' src={content.icon} alt='crossbones' />
          </div>

          <h2 style={{ marginBottom: '2rem' }}>{content.title}</h2>
          <p style={{ marginBottom: '2rem' }}>{content.body}</p>
          <div className='buttonDiv'>
            {content.type === 'decision' ? (
              <Fragment>
                <button
                  className='modalButton1'
                  onClick={(e) => handleClose(false)}>
                  cancel
                </button>
                <button
                  className='modalButton2'
                  onClick={(e) => handleClose(true)}>
                  confirm
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <button
                  className='modalDismissButton1'
                  onClick={(e) => handleDismiss()}>
                  dismiss
                </button>
              </Fragment>
            )}
          </div>
        </div>
        <div className='modalOverlay'></div>
      </Fragment>
    )
  );
};
export default Modal;
