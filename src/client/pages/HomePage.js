import React from 'react';

const Home =  function() {
    return (
        <div>
            <div>Home Component</div>
            <button onClick={() => console.log('clicked')}>Click</button>
        </div>
    )
}

export default {
    component: Home
}