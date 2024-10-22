import axios from 'axios';
import { useEffect, useState } from 'react';

export const useAxios = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {

            if (!url) {
                return;
            }
            
            setLoading(true);
            setError(null);
            
            try {
                const response = await axios(url, options);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, JSON.stringify(options)]); 

    return { data, error, loading };
};