import { api } from "./api";

// ! User Login
// ?   POST
export const postLogin = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            api.post("/login", userData)
                .then((response) => {
                    console.log('respo', response);

                    resolve(response);
                })
                .catch((err) => {
                    console.log('response', err);

                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Somethings wrong." });
        }
    });
};

// ! get products
// ?   GET
export const getProducts = () => {
    return new Promise((resolve, reject) => {
        try {
            api.get("/get-products")
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Somethings wrong." });
        }
    });
};

// ! remove products
// ?   PATCh
export const removeProduct = (productData) => {
    return new Promise((resolve, reject) => {
        try {
            api.patch("/remove-product", productData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Somethings wrong." });
        }
    });
};