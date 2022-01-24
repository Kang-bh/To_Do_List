import React, {useEffect} from 'react';
import axios from 'axios';

function LandingPage() {
    
    useEffect(() => {
        axios.get('/api/hello') // get request를 server 로 보낸다.
        .then(response => console.log(response))
    }, [])

    return (
        <div>
            LandingPage
        </div>
    );
};

export default LandingPage;