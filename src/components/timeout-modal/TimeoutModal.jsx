import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { Alert, AlertTitle} from '@mui/material';

const TimeoutModal = ({show, toShowModal}) => {
    const handleStayLoginClick = () => {
        toShowModal();
    };

    return (
        <Modal
            open={show}
            onClose={toShowModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="warning">
  <AlertTitle>Warning</AlertTitle>
  <strong>You're about to be logged out in 5 minutes, click anywhere on the screen to stay logged in!</strong>
</Alert>
                </Typography>
            </Box>
        </Modal>
    );
};

export default TimeoutModal;