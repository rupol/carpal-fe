import React, { useState, useEffect } from "react";
import { Form, withFormik, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';

import InputTags from "./InputTags"

import "./Profile-Pages.scss";

import { connect } from "react-redux";

import {
    SetUserAction,
    EditProfileAction,
    SetProfileUpdate
} from "../../Redux/Actions/UserAction";

//testing api for local host
const api = () => {
    return  axios.create({
        baseURL: "http://localhost:3001/users",
        headers: {
            authorization: localStorage.getItem("token")
        }
    })
}

//TODO - Test Use Effect with Seed Data
//TODO - Setup input for image, and coordinate with BE for storage via S3 bucket
//TODO - Create Loading Spinner Component

function UpdateProfile(props) {
    const { errors, touched } = props;
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        is_driver: false,
        hobbies: [],
        audioLikes: [],
        audioDislikes: []
    });



    useEffect(() => {
        // setUser({
        //     ...user,
        //     first_name: props.user.first_name,
        //     last_name: props.user.last_name,
        //     phone_number: props.user.phone_number,
        //     email: props.user.email,
        //     is_driver: props.user.is_driver,
        //     hobbies: props.user.hobbies,
        //     audioLikes: props.user.audioLikes,
        //     audioDislikes: props.user.audioDislikes
        // });
    }, []);

    function onEditProfileSubmit(e) {
        e.preventDefault();
        console.log("hello");
        props.EditProfileAction();
    }

    const handleInput = (e) => {
        if (e.key === "Enter" && e.target.value) {
            console.log(e.target.value)
            console.log(e.target.name)
            setUser({
                ...user,
                // [e.target.name]: [...e.target.name, e.target.value]
                [e.target.name]: e.target.value
            })
            console.log(user)
        }
    }

    return (
        <div>
            <Form className="formik-container">
                {touched.name && errors.name}
                <Field
                    name="first_name"
                    type="text"
                    placeholder="First name"
                    className="formik-fields"
                />
                <Field
                    name="last_name"
                    type="text"
                    placeholder="Last name"
                    className="formik-fields"
                />
                <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="formik-fields"
                />
                <Field
                    name="phone_number"
                    type=""
                    placeholder="Phone Number"
                    className="formik-fields"
                />
                <Field
                    name="is_driver"
                    component="select"
                    className="formik-fields"
                >
                    <option value="" disabled>
                        Would you like to be a driver:
                    </option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </Field>
                <InputTags handleInput={handleInput} name="hobbies"/>
                <Field
                    name="hobbies"
                    component="select"
                    className="formik-fields"
                    multiple="true"
                >
                    <option value="" disabled>
                        Select your Hobby:
                    </option>
                    <option value="Jogging">Jogging</option>
                    <option value="Video games">Video games</option>
                    <option value="Sports">Sports</option>
                    <option value="Gardening">Gardening</option>
                </Field>
                <Field
                    name="audioLikes"
                    component="select"
                    className="formik-fields"
                    multiple="true"
                >
                    <option value="" disabled>
                        Audio I love:
                    </option>
                    <option value="Pop">Pop</option>
                    <option value="Classical">Classical</option>
                </Field>
                <Field
                    name="audioDislikes"
                    component="select"
                    className="formik-fields"
                    multiple="true"
                >
                    <option value="" disabled>
                        Audio I Hate:
                    </option>
                    <option value="Pop">Pop</option>
                    <option value="Classical">Classical</option>
                </Field>

                {/* Mapbox will go here */}
                {user.phone_number ? (
                    // if user already has a phone number (stand in for profile), button displays "Update Profile", else "Save Profile"
                    <button
                        type="submit"
                        className="form-btn"
                        // onClick={onEditProfileSubmit}
                    >
                        Update Profile
                    </button>
                ) : (
                    <button type="submit" className="form-btn">
                        Save Profile
                    </button>
                )}
            </Form>
        </div>
    );
}

const ProfileForm = withFormik({
    mapPropsToValues: values => {
        // console.log("hello from mapProps", values);
        return {
            first_name: values.user.first_name || "",
            last_name: values.user.last_name || "",
            email: values.user.email || "",
            phone_number: values.user.phone_number || "",
            is_driver: values.user.role || "",
            //make another form for user hobbies/audio
            //or possibly throw this into props and return it on backend ?
            hobbies: values.user.hobbies || "",
            audioDislikes: values.user.audioDislikes || "",
            audioLikes: values.user.audioLikes || ""
        };
    },
    validationSchema: Yup.object().shape({
        first_name: Yup.string().required("First Name Required"),
        last_name: Yup.string().required("Last Name Required"),
        email: Yup.string()
            .email()
            .required("Email Required"),
        phone_number: Yup.number()
            .integer()
            .positive()
            .min(10)
            .required(),
        is_driver: Yup.boolean().required("You must select a role"),
        //make another form for user hobbies/audio

        hobbies: Yup.string(),
        audioDislikes: Yup.string(),
        audioLikes: Yup.string()
    }),
    handleSubmit: (values, { setStatus, props }) => {
        // we can seperate values here, values.first_name, etc
        //so we are able to make different calls depending on what changed
        //this could be an insane wait time.. 
        api().put("/update", values)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        // props.SetProfileUpdate(user);
    }
})(UpdateProfile);

const mapStateToProps = state => ({
    user: state.user.user,
    isLoading: state.user.isLoading,
    error: state.user.error,
    isEditing: state.user.isEditing
});

export default connect(mapStateToProps, {
    SetUserAction,
    EditProfileAction,
    SetProfileUpdate
})(ProfileForm);