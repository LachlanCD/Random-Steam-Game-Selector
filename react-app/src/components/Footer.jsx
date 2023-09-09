import React from 'react';
import { useEffect, useState } from 'react';
import { fetchConfig } from "../utils/fetchConfig";
import { GETData } from "../data/GETGame";

export default function Footer (){
    const [counter, setCounter] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const counterRoute = "/counter"

    useEffect(() => {
        async function fetchData() {
            try{
                setLoading(true);
                const url = await fetchConfig() + counterRoute
                const counter = await GETData(url);
                setCounter(counter);
            } catch (error) {
                setError(true);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <footer className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex flex-col items-center justify-center h-full">
            <div className="text-center">
                <p>&copy; 2023 Lachlan Garrahy</p>
                <div className='inline-flex'>
                    {counter && <p>Page Visits: {counter.counter}</p>}
                    {loading && <p>&nbsp;Loading...</p>}
                    {error && <p>&nbsp;Error</p>}
                </div>
            </div>
        </div>
        </footer>
    );
};