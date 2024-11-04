import { useEffect, useState } from 'react';
import { tesloAPI } from '../../../api/teslo.api';


export const RequestInfo = () => {

    const [info, setInfo] = useState<unknown>();

    useEffect(() => {
        tesloAPI.get('/auth/private').then((response) => setInfo(response.data)).catch(() => setInfo('Error'));
    }, [])


    return (
        <>
            <h2>Información</h2>
            <pre>
                {JSON.stringify(info, null, 2)}
            </pre>
        </>
    )
}
