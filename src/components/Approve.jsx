import { useState, useEffect, useCallback } from "react";
import { tokens } from "../theme";

//  Component
import Header from "./Header";
import MessageAlerts from "./MessageAlerts";

//  UI
import { Box, useTheme, Stack, Grid, TextField, Autocomplete, Backdrop, CircularProgress, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Api
import GeneralService from "../services/general.services";

// Global Variables
import { StatusesArray } from "../GlobalVariables.js";

// Color
// import { deepPurple } from '@mui/material/colors';

//  Icon
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
// import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const Approve = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loader, setLoader] = useState(false);
    // const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [data, setData] = useState([]);
    const [statusValue, setStatusValue] = useState(null);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const allData = useCallback(() => {
        (async () => {
            setLoader(true)
            let page = currentPage;
            let limit = pageSize;
            let status;
            if (statusValue) {
                if (statusValue.value === "pending") {
                    status = "verified"
                }
                else if (statusValue.value === "approved") {
                    status = "approved"
                }
                else if (statusValue.value === "rejected") {
                    status = "rejected"
                }
            } else {
                status = "verified"
            }

            const response = await GeneralService.getAllData({ type: props.type, status, page, limit });
            if (response.data.success) {
                setTotalRecords(response.data.data.count);
                setData(response.data.data.users);
                setLoader(false)
            }
        })();
    }, [currentPage, pageSize, statusValue, props.type]);

    useEffect(() => {
        allData();
    }, [allData]);

    // const handleSelectionChange = (selectionModel) => {
    //     setSelectedRows(selectionModel);
    // };

    const handlePageChange = (params) => {
        setCurrentPage(params + 1);
    };

    const handlePageSizeChange = (params) => {
        setPageSize(params);
    };

    useEffect(() => {
        const currentPageIndex = (currentPage - 1) * pageSize;
        setPageIndex(currentPageIndex);
    }, [currentPage, pageSize]);

    const columns = [
        { field: "index", headerName: "ID", flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            headerName: "Phone",
            field: "Company.cp_phone",
            flex: 1,
            valueGetter: (params) => {
                if (props.type === "user") {
                    return params.row?.phone ?? "";
                } else {
                    return params.row?.Company?.cp_phone ?? "";
                }
            },
        },
        {
            headerName: "Country",
            field: "Company.Country.name",
            flex: 1,
            valueGetter: (params) => {
                if (props.type === "user") {
                    return params.row?.Country?.name ?? "";
                } else {
                    return params.row?.Company?.Country?.name ?? "";
                }
            },
        },
        {
            headerName: "State",
            field: "Company.State.name",
            flex: 1,
            valueGetter: (params) => {
                if (props.type === "user") {
                    return params.row?.State?.name ?? "";
                } else {
                    return params.row?.Company?.State?.name ?? "";
                }
            },
        },
        {
            headerName: "City",
            field: "Company.City.name",
            flex: 1,
            valueGetter: (params) => {
                if (props.type === "user") {
                    return params.row?.City?.name ?? "";
                } else {
                    return params.row?.Company?.City?.name ?? "";
                }
            },
        },
        {
            headerName: 'Status',
            field: 'status',
            flex: 1,
            renderCell: (params) => {
                if (params.row?.status === 'verified') {
                    return (
                        <Chip label="Pending" color="secondary" variant="outlined" />
                    );
                } else if (params.row?.status === 'approved') {
                    return (
                        <Chip label="Approved" color="success" variant="outlined" />
                    );
                } else if (params.row?.status === 'rejected') {
                    return (
                        <Chip label="Rejected" color="error" variant="outlined" />
                    );
                } else {
                    return '';
                }
            },
        },
        {
            headerName: "Action",
            field: "action",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Stack direction="row" spacing={2}>
                        <CheckCircleRoundedIcon style={{ cursor: "pointer" }} onClick={() => UpdateStatus(row, 'approved')} />
                        <CancelRoundedIcon style={{ cursor: "pointer" }} onClick={() => UpdateStatus(row, 'rejected')} />
                        {/* <InfoRoundedIcon style={{ cursor: "pointer" }} /> */}
                        {/* <Avatar sx={{ bgcolor: deepPurple[500], cursor: "pointer" }}><FactCheckRoundedIcon /></Avatar> */}
                    </Stack>
                );
            },
        },
    ];

    const UpdateStatus = (row, status) => {
        (async () => {
            setLoader(true)
            // console.log(row, 'row')
            // console.log(status, 'status')
            const response = await GeneralService.updateStatus({ id: row.id, status });
            if (response.data.success) {
                setError(true)
                setVariant('success')
                setMessage(props.type === "user" ? 'User Approved Successfully' : 'Company Approved Successfully');
                allData();
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
                        <Header
                            title={props.title}
                            subtitle={props.subtitle}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Autocomplete
                            options={StatusesArray}
                            value={statusValue}
                            onChange={(event, newValue) => {
                                setStatusValue(newValue);
                            }}
                            renderInput={(params) =>
                                <TextField {...params} label="Status"
                                    variant="filled"
                                    InputLabelProps={{
                                        style: { color: 'rgba(255, 255, 255, 0.7)' },
                                    }}
                                />
                            }
                        />
                    </Grid>
                </Grid>
                <Box
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
                        },
                    }}
                >
                    <DataGrid
                        rows={data.map((row, index) => ({ ...row, index: pageIndex + index + 1 }))}
                        columns={columns}
                        pagination
                        pageSize={pageSize}
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        rowCount={totalRecords}
                        paginationMode="server"
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                    // components={{ Toolbar: GridToolbar }}
                    // checkboxSelection
                    // selectionModel={selectedRows}
                    // onSelectionModelChange={handleSelectionChange}
                    />
                </Box>
            </Box>
            {error && (
                <MessageAlerts message={message} variant={variant} setError={setError} />
            )}
        </>
    );
};

export default Approve;
