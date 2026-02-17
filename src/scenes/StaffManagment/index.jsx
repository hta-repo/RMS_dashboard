import { useState, useEffect, useCallback } from "react";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

//  Component
import Header from "../../components/Header";
import MessageAlerts from "../../components/MessageAlerts";

//  UI
import { Box, useTheme, Stack, Grid, Backdrop, CircularProgress, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Api
import GeneralService from "../../services/general.services";

// Global Variables
import { CapitalWord } from "../../GlobalVariables.js";

//  Icon
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AllVouchers = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const [loader, setLoader] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [data, setData] = useState([]);

    //  Show Messages
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const allData = useCallback(() => {
        (async () => {
            setLoader(true)
            let page = currentPage;
            let limit = pageSize;

            const response = await GeneralService.getAllStaffData({ page, limit });
            if (response.data.success) {
                setTotalRecords(response.data.data.count);
                setData(response.data.data.staff);
                setLoader(false)
            }
        })();
    }, [currentPage, pageSize]);

    useEffect(() => {
        allData();
    }, [allData]);

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
            valueGetter: (params) => {
                return CapitalWord(params.row?.name ?? "");
            },
        },
        {
            field: "phone",
            headerName: "Phone",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
            valueGetter: (params) => {
                return CapitalWord(params.row?.type ?? "");
            },
        },
        {
            headerName: "Country",
            field: "Country.name",
            flex: 1,
            valueGetter: (params) => {
                return params.row?.Country?.name ?? "";
            },
        },
        {
            headerName: "State",
            field: "State.name",
            flex: 1,
            valueGetter: (params) => {
                return params.row?.State?.name ?? "";
            },
        },
        {
            headerName: "City",
            field: "City.name",
            flex: 1,
            valueGetter: (params) => {
                return params.row?.City?.name ?? "";
            },
        },
        {
            headerName: "Action",
            field: "action",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Stack direction="row" spacing={2}>
                        <DeleteIcon style={{ cursor: "pointer" }} onClick={() => Delete(row.id)} />
                        <EditIcon style={{ cursor: "pointer" }} onClick={() => navigate("/edit-staff/" + row.id)} />
                    </Stack>
                );
            },
        },
    ];

    const Delete = (id) => {
        (async () => {
            setLoader(true)
            const response = await GeneralService.deleteStaff(id);
            if (response.data.success) {
                setError(true)
                setVariant('success')
                setMessage('Staff Deleted Successfully');
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
                            title="Vouchers"
                            subtitle="All Voucher"
                        />
                    </Grid>
                    <Grid item xs={3} textAlign="right" mt="20px">
                        <Button type="button" color="secondary" variant="contained" sx={{ fontWeight: "bold" }} onClick={() => navigate("/create-staff")}>
                            Create Staff
                        </Button>
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
                    />
                </Box>
            </Box>
            {error && (
                <MessageAlerts message={message} variant={variant} setError={setError} />
            )}
        </>
    );
};

export default AllVouchers;
