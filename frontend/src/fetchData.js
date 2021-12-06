const getData = async (search, limit, skip) => {
    console.log("reached here 1");
    const response = await fetch(`http://localhost:${process.env.BACKEND_PORT || 8080}/`, {
        method: "POST",
        headers: {
            // "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        // mode: 'same-origin',
        body: JSON.stringify({
            search,
            skip,
            limit
        })
    });
    console.log("reached here 2");
    if (response.ok) {
        console.log("reached here 3");
        return await response.json();   
    }
    console.log("reached here 4");
    throw new Error(response);
}

export const fetchData = ({
    search,
    limit,
    skip
}) => wrapPromise(getData(search, limit, skip));

// Note: this is a simplified implementation.
const wrapPromise = promise => {
    let status = "pending";
    let result;
    let suspender = promise.then(
        r => {
            status = "success";
            result = r;
        },
        e => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            if (status === "pending") throw suspender;
            if (status === "error") throw result;
            if (status === "success") return result;
        },
    };
};