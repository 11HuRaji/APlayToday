console.log("Loaded!")





document.getElementById("logout").addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:3000/users/logout", {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        const data = await response.json();
        if (response.status === 200) {
            localStorage.removeItem("token");
            window.location.assign("login.html");
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error(err);
    }
});
