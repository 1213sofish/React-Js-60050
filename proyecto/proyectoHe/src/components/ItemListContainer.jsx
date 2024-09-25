import React from 'react';

const ItemListContainer = ({ greeting }) => {
    const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    fontSize: '24px',
    color: '#333',
    };

    return (
    <div style={containerStyle}>
        {greeting}
    </div>
    );
};

export default ItemListContainer;