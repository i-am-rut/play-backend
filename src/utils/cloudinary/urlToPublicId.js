export default function urlToPublicId(url) {
    const urlArray = url.split("/")
    const n = urlArray.length
    const folder = urlArray[n - 2]
    const id = urlArray[n - 1].split(".")[0]

    return `${folder}/${id}`
}
