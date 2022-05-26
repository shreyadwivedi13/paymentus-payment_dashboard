import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { Button} from '@mui/material';
import "./timeoutModal.styles.css"


const TimeoutModal = ({show, toShowModal}) => {
    const onRequestClose = () => {
        toShowModal();
    };
   
    
   /*
    const onLogOffCall=
   log out code
   */

    return (<>
        <Modal
            open={show}
            onClose={toShowModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box id="timeout">
                <h2 id="warningtimeHeader" color="red"><strong>session timeout</strong></h2>
            <div id="warningTimeDescription">
                You're being timed out due to inactivity. Please choose to stay signed in or to logoff. Otherwise, you will be logged off automatically
                </div>
            <div className="btns">
            <Button onClick={onRequestClose}  variant="contained" fontSize="small" id="btn1">Log off</Button>
            <Button onClick={onRequestClose}  variant="contained" fontSize="small" id="btn2">Stay Logged In</Button>
            </div>
            
            </Box>
        </Modal>
        </>
    );
};

export default TimeoutModal;
