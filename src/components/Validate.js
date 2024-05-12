import React from 'react';

export const validateData = (data) => {
    const {
        name,
        email,
        mobile,
        address1,
        address2,
        gender,
        maritalStatus,
        stateId,
        cityId,
        emailExists,
        mobileExists
    } = data;

    const nameRegex=/^[A-Z][a-zA-z\s]*$/;
    if (!nameRegex.test(name)) {
        return "Please enter name*";
    }
    const emailRegex = /^[a-zA-Z0-9_]+[@][a-z]+[.][a-z]{2,3}$/;
    if (!emailRegex.test(email)) {
        return "Please enter a valid email*";
    }

    const mobileRegex = /^[6-9][0-9]{9}$/;
    if (!mobileRegex.test(mobile)) {
        return "Please enter a valid 10-digit mobile number*";
    }

    if (!address1 || !address2) {
        return "Address1 and Address2 are required fields*";
    }

    if (gender === 2) {
        return "Please select Gender*";
    }

    if (maritalStatus === 4) {
        return "Please select Marital Status*";
    }

    if (!stateId || !cityId) {
        return "Please select State and City*";
    }

    if (emailExists) {
        return "Email already exists*";
    }

    if (mobileExists) {
        return "Mobile already exists*";
    }

    return ""; //no error
};