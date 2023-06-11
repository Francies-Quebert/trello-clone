import { storage } from "@/appwrite"

const getURL = (image: Image) => {
    const url = storage.getFilePreview(image.bucketId, image.fileId)
    return url;
}
export default getURL;