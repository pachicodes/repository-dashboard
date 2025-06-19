import React from 'react';

const StatusIndicator = ({ status }) => {
    let indicatorColor;

    switch (status) {
        case 'online':
            indicatorColor = 'green';
            break;
        case 'offline':
            indicatorColor = 'red';
            break;
        case 'error':
            indicatorColor = 'orange';
            break;
        default:
            indicatorColor = 'gray';
    }

    return (
        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: indicatorColor }} />
    );
};

export default StatusIndicator;