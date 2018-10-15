import {LoadingAnimation} from "@bufferapp/components";
import React from "react";
import InstagramDirectUpload from "../InstagramDirectUpload/index";

const GeneralSettings = ({}) => {
    return (
        <div>
            <h1> General </h1>
            <InstagramDirectUpload/>
        </div>
    )
};
GeneralSettings.defaultProps = {
    loading: false,
};

export default GeneralSettings;