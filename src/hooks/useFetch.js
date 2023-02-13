import axios from "axios";

import { useEffect, useState } from 'react';
import { axiosRequest } from "./axios";

const useFetch = (url) => {
    const [request, setRequest] = useState({
        data: [],
        loading: false,
        error: false
    });
    useEffect(() => {
        const fecthData = async () => {
            setRequest(prev => ({
                ...prev,
                loading: true
            }))
            try {
                const res = await axiosRequest.get(url)
                setRequest(prev => (
                    { ...prev, data: res.data }
                ))

            } catch (error) {
                setRequest(prev => (
                    { ...prev, error: error }
                ))
            }
            setRequest(prev => (
                { ...prev, loading: false }
            ))
        };
        fecthData();
    }, []);
    const reFetch = async () => {
        setRequest(prev => ({
            ...prev,
            loading: true
        }))
        try {
            const res = await axiosRequest.get(url)
            setRequest(prev => (
                { ...prev, data: res.data }
            ))

        } catch (error) {
            setRequest(prev => (
                { ...prev, error: error }
            ))
        }
        setRequest(prev => (
            { ...prev, loading: false }
        ))
    };
    return {...request,reFetch}; 
};
export default useFetch;
