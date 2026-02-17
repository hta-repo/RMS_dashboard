import { useState, useEffect, useCallback } from "react";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

//  Component
import Header from "../../components/Header";
import MessageAlerts from "../../components/MessageAlerts";

//  UI
import { Box, useTheme, Stack, Backdrop, CircularProgress, Grid, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Api
import GeneralService from "../../services/general.services";

//  Icon
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';

const AllPlans = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const allData = useCallback(() => {
        (async () => {
            setLoader(true)
            const response = await GeneralService.allSubscription();
            if (response.data.success) {
                setData(response.data.data.subscriptions);
                setLoader(false)
            }
        })();
    }, []);

    useEffect(() => {
        allData();
    }, [allData]);

    const columns = [
        { field: "index", headerName: "ID", flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
        },
        {
            field: "duration",
            headerName: "Duration",
            flex: 1,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 1,
        },
        {
            field: "isFree",
            headerName: "Free",
            flex: 1,
        },
        {
            headerName: "Action",
            field: "action",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Stack direction="row" spacing={2}>
                        <DeleteRoundedIcon style={{ cursor: "pointer" }} onClick={() => Delete(row.id)} />
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => navigate("/edit-plans/" + row.id)} />
                    </Stack>
                );
            },
        },
    ];

    const Delete = (id) => {
        (async () => {
            setLoader(true)
            const response = await GeneralService.deleteSubscription(id);
            if (response.data.success) {
                setError(true)
                setVariant('success')
                setMessage('Plan Deleted Successfully');
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
                            title="Subscriptions"
                            subtitle="All Subscription Plans"
                        />
                    </Grid>
                    <Grid item xs={3} textAlign="right" mt="20px">
                        <Button type="button" color="secondary" variant="contained" sx={{ fontWeight: "bold" }} onClick={() => navigate("/create-plans")}>
                            Create Plan
                        </Button>
                    </Grid>
                </Grid>
                <Box
                    className="sub_Plans"
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
                            backgroundColor: "none",
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
                        rows={data.map((row, index) => ({ ...row, index: index + 1 }))}
                        columns={columns}
                        hideFooterPagination
                        disableSelectedRowCount={false}
                    />
                </Box>
            </Box>
            {error && (
                <MessageAlerts message={message} variant={variant} setError={setError} />
            )}
        </>
    );
};

export default AllPlans;
