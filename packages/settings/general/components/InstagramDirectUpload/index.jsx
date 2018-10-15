import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Button, Divider,
    Text,
} from '@bufferapp/components';

const editScheduleStyle = {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginBottom: '0.5rem',
};

const textWrapperStyle = {
    display: 'flex',
    marginBottom: '0.5rem',
};

const setUpDirectPostingStyle = {
    marginBottom: '1.5rem',
    marginTop: '1rem',
    textAlign: 'right',
    whiteSpace: 'nowrap',
};


let InstagramDirectUpload = ({}) => (
    <div style={editScheduleStyle}>
        <div>
            <div style={textWrapperStyle}>
                <Text
                    color={'black'}
                >
                    Enable Direct Posting
                </Text>
            </div>
            <div style={textWrapperStyle}>
                <Text
                >
                    Buffer can now post directly to Instagram, all you need to do is switch Instagram profile to a business profile.                     We've created a guide to walk you through the process.
                </Text>
            </div>
        </div>
        <div style={setUpDirectPostingStyle}>
            <Button>
                Set up direct posting
            </Button>
        </div>
    </div>
);


export default InstagramDirectUpload;
