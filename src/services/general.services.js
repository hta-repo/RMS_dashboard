
import axiosConfig from "../axiosConfig";

const getCountries = () => {
    try {
        const result = axiosConfig.get("api/general/countries")
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const getStates = (id) => {
    try {
        const result = axiosConfig.get("api/general/states/"+id)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const getCities = (id) => {
    try {
        const result = axiosConfig.get("api/general/cities/"+id)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const getAllData = (data) => {
    try {
        const result = axiosConfig.get("api/admin/users?type=" + data.type + "&status=" + data.status + "&limit=" + data.limit + "&page=" + data.page)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const updateStatus = (data) => {
    try {
        const result = axiosConfig.post("api/admin/update-status/" + data.id + "?status=" + data.status)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const createSubscription = (data) => {
    try {
        const result = axiosConfig.post("api/subscription", data)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const allSubscription = () => {
    try {
        const result = axiosConfig.get("api/subscription")
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const deleteSubscription = (id) => {
    try {
        const result = axiosConfig.delete("api/subscription/delete/" + id)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const getSubscription = (id) => {
    try {
        const result = axiosConfig.get("api/subscription/" + id)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const updateSubscription = (data) => {
    try {
        const result = axiosConfig.post("api/subscription/update/" + data.id, data.values)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const getAllVoucherData = (data) => {
    try {
        const result = axiosConfig.get("api/voucher?limit=" + data.limit + "&page=" + data.page)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const createVoucher = (data) => {
    try {
        const result = axiosConfig.post("api/voucher", data)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const deleteVoucher = (id) => {
    try {
        const result = axiosConfig.delete("api/voucher/delete/" + id)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const updateVoucher = (data) => {
    try {
        const result = axiosConfig.post("api/voucher/update/" + data.id, data.values)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const getVoucher = (id) => {
    try {
        const result = axiosConfig.get("api/voucher/" + id)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const getAllStaffData = (data) => {
    try {
        const result = axiosConfig.get("api/admin/get-staff?limit=" + data.limit + "&page=" + data.page)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const createStaff = (data) => {
    try {
        const result = axiosConfig.post("api/admin/add-staff", data)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const deleteStaff = (id) => {
    try {
        const result = axiosConfig.delete("api/admin/delete-staff/" + id)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const getStaff = (id) => {
    try {
        const result = axiosConfig.get("api/admin/get-staff/" + id)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const updateStaff = (data) => {
    try {
        const result = axiosConfig.post("api/admin/update-staff/" + data.id, data.values)
        return result;
    } catch ({ response: { status, statusText } }) {
        return { error: status, statusText };
    }
};

const GeneralService = {
    getCountries,
    getStates,
    getCities,
    getAllData,
    updateStatus,
    createSubscription,
    allSubscription,
    deleteSubscription,
    getSubscription,
    updateSubscription,
    getAllVoucherData,
    createVoucher,
    deleteVoucher,
    updateVoucher,
    getVoucher,
    getAllStaffData,
    createStaff,
    deleteStaff,
    getStaff,
    updateStaff,
};

export default GeneralService;