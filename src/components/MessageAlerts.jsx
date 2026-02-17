
import React from 'react';
import { useSnackbar } from 'notistack';

const MessageAlerts = ({ message, variant, setError }) => {
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        if (message) {
            enqueueSnackbar(message, {
                variant, autoHideDuration: 3000, anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            setError(false)
        }
    }, [message, variant, setError, enqueueSnackbar]);

    return null;
};

export default MessageAlerts;
