document.getElementById("addList").addEventListener("submit", (event) => {
    event.preventDefault();

    const date = document.getElementById("inputDate").value;
    const time = document.getElementById("inputTime").value;
    const list = document.getElementById("inputList").value;

    const data = {
        date,
        time,
        list,
    }
    // console.log(data)
    axios.post("http://localhost:3000/list", data).then((respone) => {
        console.log("berhasil ditambah" + respone)
        window.location.reload(true)
    })
    .catch((error) => {
        console.log("data gagal ditambah" + error)
    })
})

