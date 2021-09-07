import {
    Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EventSource from "react-native-sse";
import SSEObjectResolver from "./SSEObjectResolver";

var sseList = [];

export const getSSEEvents = (props) => {
    let mobileNumber = "5465676756"
    var storeSSEDataList = null;
    // Token Registration for PUSH Notifications
    const registerToken = async () => {
        const FCMToken = await AsyncStorage.getItem("FCMToken");
        let tokenBody = {
            osName: Platform.OS,
            tenentId: "T0001",
            appId: "CA0001",
            mobileNumber: params?.mobileNo,
            deviceToken: JSON.parse(FCMToken),
        };
        await DeviceTokenRegistration(tokenBody);
    };
    registerToken();


    const url = `http://customer.northeurope.cloudapp.azure.com/sse-service/createConnection/CA0001/T0001/${data?.user?.mobileNo}`;

    // To be removed when handled in backend
    await getAPI(`http://customer.northeurope.cloudapp.azure.com/sse-service/getSSEEvent/CA0001/T0001/${data?.user?.mobileNo}`);


    const eventSource = new EventSource(url, {
        headers: {
            "Cache-Control": "no-cache",
            Accept: "text/event-stream",
        },
    });

    eventSource.addEventListener("open", (event) => {
    });

    eventSource.addEventListener("message", (event) => {
        eventData = JSON.parse(event?.data);
        return sseList.push(eventData)

    });
    return sseList
},

export const getAPI = async (endURL) => {
    return axios.get(endURL).then(
        (response) => {
            return response;
        },
        (error) => {
            return error;
        }
    );
};

export const sendAPICall = async (
    url,
    payload,
    successHandler,
    errorHandler,
    requestType,
    isCustomer
) => {
    const authToken = await AsyncStorage.getItem("AuthToken");
    let config = {};
    if (isCustomer && authToken) {
        config = {
            headers: {
                Authorization: authToken,
            },
        };
    }
    if (requestType === "PUT") {
        axios
            .put(url, payload, config)
            .then((response) => {
                if (response.status === 401) {
                    return;
                }
                successHandler(response);
            })
            .catch((error) => {
                if (errorHandler) {
                    errorHandler(error);
                }
            });
    } else if (requestType === "GET") {
        config.type = "text";
        axios
            .get(url, config)
            .then((response) => {
                if (response.status === 401) {
                    return;
                }
                successHandler(response.data);
            })
            .catch((error) => {
                if (errorHandler) {
                    errorHandler(error);
                }
            });
    } else {
        axios
            .post(url, payload, config)
            .then((response) => {
                if (successHandler) {
                    successHandler(response.data);
                }
            })
            .catch((error) => {
                if (errorHandler) {
                    errorHandler(error);
                }
            });
    }
};



export const DeviceTokenRegistration = (variables) =>
    SSEObjectResolver((resolve, reject) => {
        const reqObj = variables;
        sendAPICall(
            `${BASEURL}${notificationDeviceRegistration}`,
            reqObj,
            (response) => resolve(response),
            (error) => reject(error),
            "POST",
            false
        );
    });
