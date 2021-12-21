const axios = require('axios');
const { CollectionUtility } = require('./Collection');
const { ErrorUtility } = require('./Error');

/**
 * @class
 * @description A simple way to make HTTP POST and GET requests using Axios.
 */
class RequestUtility {
    #version
    #url
    /**
     * @constructor
     * @description Sets a URL for ease of access.
     * @param {Object} [options] - The options of the RequestUtility. 
     */
    constructor({ version = 1, url = undefined } = {}) {
        this.#version = version;
        this.#url = url;
    }

    /**
     * @description Submits a GET request via the Gateway and Axios.
     * @param {*} [data] - The data to be entered into the GET request. 
     * @returns {*} The data obtained via the GET request.
     */
    get(data) {
        return this.#gateway("get", data);
    }

    /**
     * @description Submits a POST request via the Gateway and Axios.
     * @param {*} [data] - The data to be entered into the POST request.
     * @returns {*} The data obtained via the POST request.
     */
    post(data) {
        return this.#gateway("post", data);
    }

    /**
     * @private
     * @description The gateway connecting instances of the Utility.
     * @param {string} type - The type of request to be sent.
     * @param {*} data - The provided Data.
     * @returns {*} The obtained Data.
     */
    #gateway(type, data) {
        if (type === "get") {
            if (this.#version === 1) {
                return this.#get_v1(data);
            }

            return this.#get_cv(data);
        }

        if (type === "post") {
            if (this.#version === 1) {
                return this.#post_v1(data);
            }

            return this.post_cv(data);
        }
    }

    #get_cv(data) {
        return this.#get_v1(data);
    }

    #get_v1(data) {
        try {
            return axios.get(this.#url);
        } catch (error) {
            throw new ErrorUtility("RequestError", error.message);
        }
    }

    #post_v1(data) {
        try {
            axios.post(this.#url, data);
        } catch (error) {
            throw new ErrorUtility("RequestError", error.message);
        }
    }
}

/**
 * @class
 * @extends RequestUtility
 * @description An automatic Collection-sorter for GET requests.
 */
class CollectionRequestUtility extends RequestUtility {
    /**
     * @constructor
     * @description Creates a new RequestUtility instance.
     * @param {Object} [options] - The options to be used for the [RequestUtility]{@link RequestUtility.constructor} 
     */
    constructor({ version = 1, url = undefined }) {
        super({ version, url });
        this.Collection = new CollectionUtility();
    }

    /**
     * @description Automatically sorts GET request data into a Collection.
     * @param {*} [data] - The data to be entered into the GET request. 
     * @returns {*} Collection instance containing data from the GET request.
     */
    getInCollection(data) {
        return (async () => {
            await this.get(data).then(res => {
                for (const [key, value] of Object.entries(res)) {
                    this.Collection.set(key, value);
                }
            });
            return this.Collection;
        });
    }
}

module.exports = { RequestUtility, CollectionRequestUtility }