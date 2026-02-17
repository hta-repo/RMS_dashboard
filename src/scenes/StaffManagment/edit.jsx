import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

//  UI
import { Box, Button, TextField, Autocomplete, Backdrop, CircularProgress, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

//   Componenet
import Header from "../../components/Header";
import MessageAlerts from "../../components/MessageAlerts";

// Global Variables
import { userTypeArray, genderArray } from "../../GlobalVariables.js";

// Api
import GeneralService from "../../services/general.services";

const EditStaff = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({});
    const [countries, setCountries] = useState([]);
    const [countryStates, setCountryStates] = useState([]);
    const [stateCities, setStateCities] = useState([]);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            city: "",
            country: "",
            state: "",
            email: "",
            phone: "",
            type: "",
            gender: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("required"),
            city: yup.object().required("required"),
            country: yup.object().required("required"),
            state: yup.object().required("required"),
            email: yup.string().email("Invalid email").required("required"),
            phone: yup.string().required("required").min(11).max(11),
            type: yup.string().required("required"),
            gender: yup.string().required("required"),
        }),
        onSubmit: (values) => {
            values.country = values.country.id
            values.state = values.state.id
            values.city = values.city.id
            editStaff(JSON.stringify(values))
        },
    });

    const editStaff = (values) => {
        (async () => {
            setLoader(true)
            const response = await GeneralService.updateStaff({ id, values });
            if (response.data.success) {
                formik.resetForm();
                setError(true)
                setVariant('success')
                setMessage('Staff Updated Successfully');
                setLoader(false)
            }
        })();
    };

    const getAllData = useCallback(() => {
        (async () => {
            const response = await GeneralService.getStaff(id);
            console.log(response.data.data.staff, 'response.data.data')
            const result = response.data.data.staff
            setData(result);
        })();
    }, [id]);

    useEffect(() => {
        getAllData()
    }, [getAllData]);

    useEffect(() => {
        if (data) {
            formik.setFieldValue("name", data.name);
            formik.setFieldValue("email", data.email);
            formik.setFieldValue("phone", data.phone);
            formik.setFieldValue("type", data.type);
            formik.setFieldValue("gender", data.gender);
            if (data.country) {
                formik.setFieldValue("country", data.Country);
                formik.setFieldValue("state", data.State);
                getAllCountries()
                getAllStates(data.country)
            }
            if (data.state) {
                formik.setFieldValue("city", data.City);
                getAllCities(data.State)
            }
        }
    }, [data])


    const getAllCountries = () => {
        (async () => {
            const response = await GeneralService.getCountries();
            setCountries(response.data.data);
        })();
    };

    const getAllStates = (id) => {
        (async () => {
            const response = await GeneralService.getStates(id);
            setCountryStates(response.data.data)
        })();
    };

    const getAllCities = (obj) => {
        (async () => {
            const response = await GeneralService.getCities(obj.id);
            setStateCities(response.data.data)
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
                        <Header title="EDIT STAFF" subtitle="Edit a Staff" />
                    </Grid>
                    <Grid item xs={3} textAlign="right" mt="20px">
                        <Button type="button" color="secondary" variant="contained" sx={{ fontWeight: "bold" }} onClick={() => navigate("/staff")}>
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
                            autoComplete="off"
                            type="text"
                            label="Name"
                            value={formik.values.name}
                            onChange={e => {
                                formik.setFieldValue("name", e.target.value);
                            }}
                            name="name"
                            error={!!formik.touched.name && !!formik.errors.name}
                            helpertext={formik.touched.name && formik.errors.name}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            autoComplete="off"
                            type="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={e => {
                                formik.setFieldValue("email", e.target.value);
                            }}
                            name="email"
                            error={!!formik.touched.email && !!formik.errors.email}
                            helpertext={formik.touched.email && formik.errors.email}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <Box sx={{ gridColumn: "span 2" }}>
                            <Autocomplete
                                options={countries}
                                getOptionLabel={(option) => option.name || ""}
                                error={formik.touched.country && formik.errors.country}
                                helpertext={formik.touched.country && formik.errors.country}
                                value={formik.values.country || null}
                                disabled
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Country"
                                        variant="filled"
                                        name="country"
                                        error={formik.touched.country && !!formik.errors.country}
                                        helpertext={formik.touched.country && formik.errors.country}
                                        InputProps={{
                                            style: { color: 'rgba(255, 255, 255, 0.7)' },
                                        }}
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue("country", newValue ? newValue : null);
                                }}
                                onBlur={formik.handleBlur("country")}
                            />
                        </Box>
                        <Box sx={{ gridColumn: "span 2" }}>
                            <Autocomplete
                                options={countryStates}
                                getOptionLabel={(option) => option.name || ""}
                                error={formik.touched.state && formik.errors.state}
                                helpertext={formik.touched.state && formik.errors.state}
                                value={formik.values.state || null}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="State"
                                        variant="filled"
                                        name="state"
                                        error={formik.touched.state && !!formik.errors.state}
                                        helpertext={formik.touched.state && formik.errors.state}
                                        InputLabelProps={{
                                            style: { color: 'rgba(255, 255, 255, 0.7)' },
                                        }}
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue("state", newValue ? newValue : null);
                                    formik.setFieldValue("city", "");
                                    getAllCities(newValue)
                                }}
                            />
                        </Box>
                        <Box sx={{ gridColumn: "span 2" }}>
                            <Autocomplete
                                options={stateCities}
                                getOptionLabel={(option) => option.name || ""}
                                error={formik.touched.city && formik.errors.city}
                                helpertext={formik.touched.city && formik.errors.city}
                                value={formik.values.city || null}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="City"
                                        variant="filled"
                                        name="city"
                                        error={formik.touched.city && !!formik.errors.city}
                                        helpertext={formik.touched.city && formik.errors.city}
                                        InputLabelProps={{
                                            style: { color: 'rgba(255, 255, 255, 0.7)' },
                                        }}
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue("city", newValue ? newValue : null);
                                }}
                            />
                        </Box>
                        <Box sx={{ gridColumn: "span 2" }}>
                            <Autocomplete
                                options={userTypeArray}
                                getOptionLabel={(option) => option.label || ""}
                                error={formik.touched.type && formik.errors.type}
                                helpertext={formik.touched.type && formik.errors.type}
                                value={data?.type ? (userTypeArray.find(option => option.value === formik.values.type)) : null}
                                disabled
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="User Type"
                                        variant="filled"
                                        name="type"
                                        error={formik.touched.type && !!formik.errors.type}
                                        helpertext={formik.touched.type && formik.errors.type}
                                        InputLabelProps={{
                                            style: { color: 'rgba(255, 255, 255, 0.7)' },
                                        }}
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue("type", newValue ? newValue.value : null);
                                }}
                                isOptionEqualToValue={(option, value) => option.value === value || (value === "" && option.value === null)}
                            />
                        </Box>
                        <Box sx={{ gridColumn: "span 2" }}>
                            <Autocomplete
                                options={genderArray}
                                getOptionLabel={(option) => option.label || ""}
                                error={formik.touched.gender && formik.errors.gender}
                                helpertext={formik.touched.gender && formik.errors.gender}
                                value={data?.gender ? (genderArray.find(option => option.value === formik.values.gender)) : null}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Gender"
                                        variant="filled"
                                        name="gender"
                                        error={formik.touched.gender && !!formik.errors.gender}
                                        helpertext={formik.touched.gender && formik.errors.gender}
                                        InputLabelProps={{
                                            style: { color: 'rgba(255, 255, 255, 0.7)' },
                                        }}
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue("gender", newValue ? newValue.value : null);
                                }}
                                isOptionEqualToValue={(option, value) => option.value === value || (value === "" && option.value === null)}
                            />
                        </Box>
                        <Box sx={{ gridColumn: "span 2" }}>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Phone"
                                autoComplete="off"
                                value={formik.values.phone}
                                onChange={e => {
                                    formik.setFieldValue("phone", e.target.value);
                                }}
                                name="phone"
                                error={!!formik.touched.phone && !!formik.errors.phone}
                                helpertext={formik.touched.phone && formik.errors.phone}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained" sx={{ fontWeight: "bold" }}>
                            Update Staff
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

export default EditStaff;
