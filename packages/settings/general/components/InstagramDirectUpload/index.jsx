import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Button,
    Text,
} from '@bufferapp/components';




let InstagramDirectUpload = ({}) => (
    <div>
        <h3>Enable Direct Posting</h3>
        <Text
        >
            Buffer can now post directly to Instagram, all you need to do is switch Instagram profile to a business profile. We've               created a guide to walk you through the process.
        </Text>
        <Button>
            Set up direct posting
        </Button>
    </div>
);


export default InstagramDirectUpload;
