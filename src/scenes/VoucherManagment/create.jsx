import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//  UI
import { Box, Button, TextField, Autocomplete, Backdrop, CircularProgress, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

//  Date
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//   Componenet
import Header from "../../components/Header";
import MessageAlerts from "../../components/MessageAlerts";

// Global Variables
import { TypeArray, priceArray } from "../../GlobalVariables.js";

// Api
import GeneralService from "../../services/general.services";

//  Style
import './style.css'

const CreateVouchers = () => {
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
            ownerType: "",
            type: "",
            code: "",
            value: "",
            start_date: "",
            end_date: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("required"),
            ownerType: yup.string().required("required"),
            type: yup.string().required("required"),
            code: yup.string().required("required"),
            value: yup.number().required("required"),
            start_date: yup.string().required("required"),
            end_date: yup.string().required("required"),
        }),
        onSubmit: (values) => {
            createVoucher(JSON.stringify(values))
        },
    });

    const createVoucher = (data) => {
        (async () => {
            setLoader(true)
            const response = await GeneralService.createVoucher(data);
            if (response.data.success) {
                formik.resetForm();
                setError(true)
                setVariant('success')
                setMessage('Voucher Created Successfully');
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
                        <Header title="CREATE Voucher" subtitle="Create a Voucher" />
                    </Grid>
                    <Grid item xs={3} textAlign="right" mt="20px">
                        <Button type="button" color="secondary" variant="contained" sx={{ fontWeight: "bold" }} onClick={() => navigate("/vouchers")}>
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
                        <Autocomplete
                            options={TypeArray}
                            getOptionLabel={(option) => option.label}
                            error={!!formik.touched.ownerType && !!formik.errors.ownerType}
                            helpertext={formik.touched.ownerType && formik.errors.ownerType}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Owner Type"
                                    variant="filled"
                                    name="ownerType"
                                    value={formik.values.ownerType}
                                    InputLabelProps={{
                                        style: { color: 'rgba(255, 255, 255, 0.7)' },
                                    }}
                                    sx={{ gridColumn: "span 1" }}
                                />
                            )}
                            onChange={(event, newValue) => {
                                formik.setFieldValue("ownerType", newValue.value);
                            }}
                        />
                        <Autocomplete
                            options={priceArray}
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
                        <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Value"
                            value={formik.values.value}
                            onChange={e => {
                                formik.setFieldValue("value", e.target.value);
                            }}
                            name="value"
                            error={!!formik.touched.value && !!formik.errors.value}
                            helpertext={formik.touched.value && formik.errors.value}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Code"
                            value={formik.values.code}
                            onChange={e => {
                                formik.setFieldValue("code", e.target.value);
                            }}
                            name="code"
                            error={!!formik.touched.code && !!formik.errors.code}
                            helpertext={formik.touched.code && formik.errors.code}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <Box sx={{ gridColumn: "span 1" }}>
                            <div className="custom-datepicker-input">
                                <DatePicker
                                    selected={formik.values.start_date}
                                    onChange={(date) => formik.setFieldValue("start_date", date)}
                                    customInput={<input className="input-element" />}
                                    placeholderText="Start Date"
                                />
                            </div>
                        </Box>
                        <Box sx={{ gridColumn: "span 1" }}>
                            <div className="custom-datepicker-input">
                                <DatePicker
                                    selected={formik.values.end_date}
                                    onChange={(date) => formik.setFieldValue("end_date", date)}
                                    customInput={<input className="input-element" />}
                                    placeholderText="End Date"
                                />
                            </div>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained" sx={{ fontWeight: "bold" }}>
                            Create New Voucher
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

export default CreateVouchers;
