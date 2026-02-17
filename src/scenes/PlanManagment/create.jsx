import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, TextField, Autocomplete, Checkbox, FormControlLabel, Backdrop, CircularProgress, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

//   Componenet
import Header from "../../components/Header";
import MessageAlerts from "../../components/MessageAlerts";

// Global Variables
import { TypeArray } from "../../GlobalVariables.js";

// Api
import GeneralService from "../../services/general.services";


const CreatePlans = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: "",
            duration: "",
            job_post_count: "",
            featured_jobs: "",
            type: "",
            isFree: false,
            video: "",
            pictures: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("required"),
            description: yup.string().required("required"),
            price: yup.number().positive('Positive Value').required("required"),
            duration: yup.number().positive('Positive Value').required("required"),
            job_post_count: yup.number().positive('Positive Value').required("required"),
            featured_jobs: yup.number().positive('Positive Value').required("required"),
            type: yup.string().required("required"),
            isFree: yup.bool(),
            video: yup.number().positive('Positive Value'),
            pictures: yup.number().positive('Positive Value'),
        }),
        onSubmit: (values) => {
            if (values.type === "company") {
                values.video = 0
                values.pictures = 0
            }
            createSubscription(JSON.stringify(values))
        },
    });

    const createSubscription = (data) => {
        (async () => {
            setLoader(true)
            const response = await GeneralService.createSubscription(data);
            if (response.data.success) {
                formik.resetForm();
                setError(true)
                setVariant('success')
                setMessage('Subscription Plan Created Successfully');
                setLoader(false)
            }
        })();
    };

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box m="20px">
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <Header title="CREATE PLANS" subtitle="Create a New Plans" />
                    </Grid>
                    <Grid item xs={3} textAlign="right" mt="20px">
                        <Button type="button" color="secondary" variant="contained" sx={{ fontWeight: "bold" }} onClick={() => navigate("/plans")}>
                            Back
                        </Button>
                    </Grid>
                </Grid>
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Name"
                            value={formik.values.name}
                            onChange={e => {
                                formik.setFieldValue("name", e.target.value);
                            }}
                            name="name"
                            error={!!formik.touched.name && !!formik.errors.name}
                            helpertext={formik.touched.name && formik.errors.name}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Descripttion"
                            value={formik.values.description}
                            onChange={e => {
                                formik.setFieldValue("description", e.target.value);
                            }}
                            name="description"
                            error={!!formik.touched.description && !!formik.errors.description}
                            helpertext={formik.touched.description && formik.errors.description}
                            sx={{ gridColumn: "span 4" }}
                        />

                        <Autocomplete
                            options={TypeArray}
                            getOptionLabel={(option) => option.label}
                            error={!!formik.touched.type && !!formik.errors.type}
                            helpertext={formik.touched.type && formik.errors.type}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Type"
                                    variant="filled"
                                    name="type"
                                    value={formik.values.type}
                                    InputLabelProps={{
                                        style: { color: 'rgba(255, 255, 255, 0.7)' },
                                    }}
                                    sx={{ gridColumn: "span 1" }}
                                />
                            )}
                            onChange={(event, newValue) => {
                                formik.setFieldValue("type", newValue.value);
                            }}
                        />
                        {formik.values.type === "user" && (
                            <>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    label="Video"
                                    value={formik.values.video}
                                    onChange={e => {
                                        formik.setFieldValue("video", e.target.value);
                                    }}
                                    name="video"
                                    error={!!formik.touched.video && !!formik.errors.video}
                                    helpertext={formik.touched.video && formik.errors.video}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    label="Pictures"
                                    value={formik.values.pictures}
                                    onChange={e => {
                                        formik.setFieldValue("pictures", e.target.value);
                                    }}
                                    name="pictures"
                                    error={!!formik.touched.pictures && !!formik.errors.pictures}
                                    helpertext={formik.touched.pictures && formik.errors.pictures}
                                    sx={{ gridColumn: "span 1" }}
                                />
                            </>
                        )}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Duration"
                            value={formik.values.duration}
                            onChange={e => {
                                formik.setFieldValue("duration", e.target.value);
                            }}
                            name="duration"
                            error={!!formik.touched.duration && !!formik.errors.duration}
                            helpertext={formik.touched.duration && formik.errors.duration}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Price"
                            value={formik.values.price}
                            onChange={e => {
                                formik.setFieldValue("price", e.target.value);
                            }}
                            name="price"
                            error={!!formik.touched.price && !!formik.errors.price}
                            helpertext={formik.touched.price && formik.errors.price}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Job Post Count"
                            value={formik.values.job_post_count}
                            onChange={e => {
                                formik.setFieldValue("job_post_count", e.target.value);
                            }}
                            name="job_post_count"
                            error={!!formik.touched.job_post_count && !!formik.errors.job_post_count}
                            helpertext={formik.touched.job_post_count && formik.errors.job_post_count}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Featured Jobs"
                            value={formik.values.featured_jobs}
                            onChange={e => {
                                formik.setFieldValue("featured_jobs", e.target.value);
                            }}
                            name="featured_jobs"
                            error={!!formik.touched.featured_jobs && !!formik.errors.featured_jobs}
                            helpertext={formik.touched.featured_jobs && formik.errors.featured_jobs}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <FormControlLabel
                            label="is Free"
                            control={
                                <Checkbox
                                    value={formik.values.isFree}
                                    onChange={e => {
                                        formik.setFieldValue("isFree", e.target.checked);
                                    }}
                                    sx={{
                                        "&.Mui-checked": {
                                            color: "#70d8bd",
                                        },
                                        '& .MuiSvgIcon-root': { fontSize: 25 }
                                    }}
                                />
                            }
                        />
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained" sx={{ fontWeight: "bold" }}>
                            Create New Package
                        </Button>
                    </Box>
                </form>
            </Box>
            {error && (
                <MessageAlerts message={message} variant={variant} setError={setError} />
            )}
        </>
    );
};

export default CreatePlans;
