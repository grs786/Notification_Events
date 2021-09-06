import {
    Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeviceTokenRegistration } from "../../api";
import EventSource from "react-native-sse";
import SSEObjectResolver from "../../utilities/SSEObjectResolver";

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
        let eventData = JSON.parse(event?.data);
        storeSSEDataList(sseList, eventData);
    });

    let storeSSEDataList = (arr, item) => {
        setRefreshData(false);
        const found = arr.some(data => data?.eventType === item?.eventType);
        if (found === false) {
            sseList.push(item);
            setRefreshData(true);
        } else {
            for (let i = 0; i < sseList.length; i++) {
                if (sseList[i]?.vinNumber === item?.vinNumber) {
                    if (sseList[i]?.alertName === item?.alertName) {
                        sseList.splice(i, 1);
                    }
                }
            }
            sseList.push(item);
            setRefreshData(true);
        }
    };
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