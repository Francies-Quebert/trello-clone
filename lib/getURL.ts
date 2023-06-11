import { storage } from "@/appwrite"

const getURL = (image: Image) => {
    console.log(image,'imageimage')
    const url = storage.getFilePreview(image.bucketId, image.fileId)
    return url;
}
export default getURL;