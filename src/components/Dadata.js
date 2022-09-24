import React, { useState } from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import {useDispatch} from "react-redux";
import {useDebouncedCallback} from "use-debounce";
import {updateVal} from "../features";

const API_KEY = "3c2e964517d7358776e07d7d699cc2b0626dac54";

const Dadata = () => {
    const [value, setValue] = useState();
    const dispatch = useDispatch();

    const updateValFromStore = useDebouncedCallback((key, val) => {
        dispatch(updateVal({key, val}))
    }, 250)

    const handleChange = (event) => {
        setValue(event);
    }

    return (
        <div>
            <AddressSuggestions token={API_KEY} value={value} onChange={(val, event) => {
                handleChange(event)
                updateValFromStore('address', val)
            }} />
        </div>
    );
};

export default Dadata;
