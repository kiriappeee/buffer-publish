import {Divider, LoadingAnimation} from "@bufferapp/components";
import React from "react";
import InstagramDirectUpload from "../InstagramDirectUpload/index";

const GeneralSettings = ({}) => {
    return (
        <div>
            <InstagramDirectUpload/>
            <Divider />
        </div>
    )
};
GeneralSettings.defaultProps = {
    loading: false,
};

export default GeneralSettings;