import React, {forwardRef} from 'react';
import {Alert} from '@mui/material';

export const SnackbarAlert = forwardRef(
    function SnackbarAlert(props, ref) {
        return <Alert elevation={6} ref={ref} {...props} />
    }
)