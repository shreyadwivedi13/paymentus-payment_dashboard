import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { Button} from '@mui/material';
import "./timeoutModal.styles.css"


const TimeoutModal = ({show, toShowModal, toLogOut}) => {

    const onRequestClose = () => {
        toShowModal();
    };
   
    const onRequestLogOut = () => {
        toLogOut();
    };
    
   /*
    const onLogOffCall=
   log out code
   */

    return (<>
        <Modal
            open={show}

            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box id="timeout">
                <h2 id="warningtimeHeader" color="red"><strong>session timeout</strong></h2>
            <div id="warningTimeDescription">
                You're being timed out due to inactivity. Please choose to stay signed in or to logout. Otherwise, you will be logged off automatically in 5 minutes.
                </div>
            <div className="btns">
            <Button onClick={onRequestLogOut} variant="contained" fontSize="small" id="btn1">Logout</Button>
            <Button onClick={onRequestClose}  variant="contained" fontSize="small" id="btn2">Stay Logged In</Button>
            </div>
            
            </Box>
        </Modal>
        </>
    );
};

export default TimeoutModal;
