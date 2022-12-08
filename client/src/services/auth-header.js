import { getUserData } from "../storage/auth.storage";

export default function authHeader() {
    //const user = JSON.parse(localStorage?.getItem("user"));
    //const user = { name: "test" };
    var user = getUserData();
    // var user = null;

    // const userData = localStorage?.getItem("user");
    // if(userData) {
    //     user = JSON.parse(userData);
    // }

    if(user && user.accessToken) {
        return { Authorization: `Bearer ${user.accessToken}`, "Content-Type": "application/json" };
    } else {
        return {};
    }
}